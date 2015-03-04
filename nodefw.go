package main

import (
	"github.com/ziutek/mymysql/mysql"
	_ "github.com/ziutek/mymysql/native" // Native engine
	// _ "github.com/ziutek/mymysql/thrsafe" // Thread safe engine

	"fmt"
	"net/http"
	"os"
)

func checkError(error error) {
	if error != nil {
		panic("ERROR: " + error.Error()) // terminate program
	}
}
func status(w http.ResponseWriter, r *http.Request) {

	w.Write([]byte("status!"))
	db := mysql.New("tcp", "", "127.0.0.1:3306", "android_server", "123456", "nodefw")

	err := db.Connect()
	if err != nil {
		panic(err)
	}

	res, err := db.Start("select * from stations_status")
	checkError(err)

	// Print fields names
	for _, field := range res.Fields() {
		fmt.Print(field.Name, " ")
	}
	fmt.Println()

	// Print all rows
	for {
		row, err := res.GetRow()
		checkError(err)

		if row == nil {
			// No more rows
			break
		}

		// Print all cols
		for _, col := range row {
			if col == nil {
				fmt.Print("<NULL>")
			} else {
				os.Stdout.Write(col.([]byte))
			}
			fmt.Print(" ")
		}
		fmt.Println()
	}

}

func StaticServer(w http.ResponseWriter, req *http.Request) {

	staticHandler := http.FileServer(http.Dir("./htmlsrc/"))
	staticHandler.ServeHTTP(w, req)
	return
}

func main() {

	http.HandleFunc("/status/", status)
	http.Handle("/src/", http.StripPrefix("/src/", http.FileServer(http.Dir("./htmlsrc/"))))
	http.ListenAndServe(":8080", nil)
}
