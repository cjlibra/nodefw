package main

import (
	"strconv"

	"github.com/ziutek/mymysql/mysql"
	_ "github.com/ziutek/mymysql/native" // Native engine
	//"html"
	//"log"
	//"net/url"
	// _ "github.com/ziutek/mymysql/thrsafe" // Thread safe engine

	"encoding/json"
	"fmt"
	"net/http"
	"os"
)

type Status struct {
	StationID     int
	Workshop      string
	StationType   string
	LoaderID      int
	UnLoaderId    int
	StationStatus string
}
type Alarm struct {
	AlarmID          int
	Workshop         string
	StationID        int
	StationType      string
	MachineID        int
	AlarmCode        int
	AlarmDescription string
	StartTime        string
}

func checkError(error error) {
	if error != nil {
		panic("ERROR: " + error.Error()) // terminate program
	}
}
func opendb() mysql.Conn {

	db := mysql.New("tcp", "", "127.0.0.1:3306", "android_server", "123456", "nodefw")

	err := db.Connect()
	if err != nil {
		panic(err)
	}
	return db

}
func statusfunc(w http.ResponseWriter, r *http.Request) {
	db := opendb()
	defer db.Close()
	res, err := db.Start("select * from stations_status")
	checkError(err)

	// Print fields names
	for _, field := range res.Fields() {
		fmt.Print(field.Name, " ")
	}
	fmt.Println()

	// Print all rows
	var status Status
	var statuses []Status

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
				fmt.Print("error col is <null>")
				return
			} else {
				os.Stdout.Write(col.([]byte))
			}
			fmt.Print(" ")
		}
		fmt.Println()

		status.StationID = row.Int(res.Map("StationID"))
		status.Workshop = row.Str(res.Map("Workshop"))
		status.StationType = row.Str(res.Map("StationType"))
		status.LoaderID = row.Int(res.Map("LoaderID"))
		status.UnLoaderId = row.Int(res.Map("UnloaderID"))
		status.StationStatus = row.Str(res.Map("StationStatus"))

		statuses = append(statuses, status)
	}

	b, err := json.Marshal(statuses)
	if err != nil {
		checkError(err)
	}
	os.Stdout.Write(b)
	w.Write(b)

}
func alarmfunc(w http.ResponseWriter, r *http.Request) {
	r.ParseForm() //解析参数，默认是不会解析的
	//fmt.Fprintf(w, "Hi, I love you %s", html.EscapeString(r.URL.Path[1:]))
	if r.Method == "GET" {
		//fmt.Println("method:", r.Method) //获取请求的方法
		stationid := r.FormValue("stationid")
		//w.Write([]byte(stationid[0]))

		if stationid == "" {
			w.Write([]byte("error input! no stationid"))
			return
		} else {
			//fmt.Println(stationid)
			_, err := strconv.Atoi(stationid)
			if err != nil {
				w.Write([]byte("error input! no num"))
				return
			}
			db := opendb()
			defer db.Close()
			res, err := db.Start("select * from alarms_active where StationID = %s", stationid)
			checkError(err)
			var alarm Alarm
			var alarms []Alarm
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
						fmt.Print("error  col is<NULL>")
						return
					} else {
						os.Stdout.Write(col.([]byte))
					}
					fmt.Print(" ")
				}
				fmt.Println()

				alarm.AlarmID = row.Int(res.Map("AlarmID"))
				alarm.Workshop = row.Str(res.Map("Workshop"))
				alarm.StationID = row.Int(res.Map("StationID"))
				alarm.StationType = row.Str(res.Map("StationType"))
				alarm.MachineID = row.Int(res.Map("MachineID"))
				alarm.AlarmCode = row.Int(res.Map("AlarmCode"))
				alarm.AlarmDescription = row.Str(res.Map("AlarmDescription"))
				alarm.StartTime = row.Str(res.Map("StartTime"))
				alarms = append(alarms, alarm)
			}
			b, err := json.Marshal(alarms)
			if err != nil {
				checkError(err)
			}
			os.Stdout.Write(b)
			w.Write(b)
		}
	}
}

type WorkShop struct {
	WorkShop string
}

func infogetwshopfunc(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	db := opendb()
	defer db.Close()
	res, err := db.Start("SELECT DISTINCT Workshop FROM stations")
	checkError(err)
	var workshop WorkShop
	var workshops []WorkShop
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
				fmt.Print("error  col is<NULL>")
				return
			} else {
				os.Stdout.Write(col.([]byte))
			}
			fmt.Print(" ")
		}
		fmt.Println()

		workshop.WorkShop = row.Str(res.Map("Workshop"))

		workshops = append(workshops, workshop)
	}
	b, err := json.Marshal(workshops)
	if err != nil {
		checkError(err)
	}
	os.Stdout.Write(b)
	w.Write(b)

}

type LineType struct {
	Linetype string
}

func infogetltypefunc(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	db := opendb()
	defer db.Close()
	res, err := db.Start("SELECT DISTINCT LineType FROM stations")
	checkError(err)
	var linetype LineType
	var linetypes []LineType
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
				fmt.Print("error  col is<NULL>")
				return
			} else {
				os.Stdout.Write(col.([]byte))
			}
			fmt.Print(" ")
		}
		fmt.Println()

		linetype.Linetype = row.Str(res.Map("LineType"))

		linetypes = append(linetypes, linetype)
	}
	b, err := json.Marshal(linetypes)
	if err != nil {
		checkError(err)
	}
	os.Stdout.Write(b)
	w.Write(b)
}

type SID struct {
	Sid int
}

func sidbyworkshop(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	workshop := r.FormValue("workshop")
	if workshop == "" {
		w.Write([]byte("error input! no  workshop"))
		return
	} else {
		db := opendb()
		defer db.Close()
		res, err := db.Start("select LineID from stations where Workshop = \"%s\" ", workshop)
		checkError(err)
		var sid SID
		var sids []SID
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
					fmt.Print("error  col is<NULL>")
					return
				} else {
					os.Stdout.Write(col.([]byte))
				}
				fmt.Print(" ")
			}
			fmt.Println()

			sid.Sid = row.Int(res.Map("LineID"))

			sids = append(sids, sid)
		}
		b, err := json.Marshal(sids)
		if err != nil {
			checkError(err)
		}
		os.Stdout.Write(b)
		w.Write(b)

	}

}

func sidbylinetype(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	linetype := r.FormValue("linetype")
	if linetype == "" {
		w.Write([]byte("error input! no  linetype"))
		return
	} else {
		db := opendb()
		defer db.Close()
		res, err := db.Start("select LineID from stations where LineType = \"%s\" ", linetype)
		checkError(err)
		var sid SID
		var sids []SID
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
					fmt.Print("error  col is<NULL>")
					return
				} else {
					os.Stdout.Write(col.([]byte))
				}
				fmt.Print(" ")
			}
			fmt.Println()

			sid.Sid = row.Int(res.Map("LineID"))

			sids = append(sids, sid)
		}
		b, err := json.Marshal(sids)
		if err != nil {
			checkError(err)
		}
		os.Stdout.Write(b)
		w.Write(b)

	}

}
func StaticServer(w http.ResponseWriter, req *http.Request) {

	staticHandler := http.FileServer(http.Dir("./htmlsrc/"))
	staticHandler.ServeHTTP(w, req)
	return
}

type InfoMachine struct {
	MachineID      int
	MachineClass   string
	MachineName    string
	MachineType    string
	LoadedState    string
	TotalOutput    int
	CurOutput      int
	CurTotalOutput int
	CurPartNum     string
	CurBatchNum    string
	UpdateTime     string
	LineID         int
	Workshop       string
	LineType       string
	LoaderID       int
	LoaderStatus   string
	UnloaderID     int
	UnloaderStatus string
}

func infoloaderbylineid(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	lineid := r.FormValue("lineid")
	loader := r.FormValue("loader")
	_, err := strconv.Atoi(loader)
	if err != nil {
		w.Write([]byte("error input loader! no num"))
		return
	}
	if lineid == "" {
		w.Write([]byte("error input! no lineid"))
		return
	} else {
		//fmt.Println(stationid)
		_, err := strconv.Atoi(lineid)
		if err != nil {
			w.Write([]byte("error input! no num"))
			return
		}
		db := opendb()
		defer db.Close()
		var loadername string
		if loader == "1" {
			loadername = "LoaderID"
		} else {
			loadername = "UnloaderID"

		}

		res, err := db.Start("select * from machines left join stations on stations.%s = machines.MachineID where LineID = %s", loadername, lineid)

		checkError(err)
		var infomachine InfoMachine

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
					fmt.Print("error  col is<NULL>")
					//return
				} else {
					os.Stdout.Write(col.([]byte))
				}
				fmt.Print(" ")
			}
			fmt.Println()

			infomachine.MachineID = row.Int(res.Map("MachineID"))
			infomachine.MachineClass = row.Str(res.Map("MachineClass"))
			infomachine.MachineName = row.Str(res.Map("MachineName"))
			infomachine.MachineType = row.Str(res.Map("MachineType"))
			infomachine.LoadedState = row.Str(res.Map("LoadedState"))
			infomachine.TotalOutput = row.Int(res.Map("TotalOutput"))
			infomachine.CurOutput = row.Int(res.Map("CurOutput"))
			infomachine.CurTotalOutput = row.Int(res.Map("CurTotalOutput"))
			infomachine.CurPartNum = row.Str(res.Map("CurPartNum"))
			infomachine.CurBatchNum = row.Str(res.Map("CurBatchNum"))
			infomachine.UpdateTime = row.Str(res.Map("UpdateTime"))
			infomachine.LineID = row.Int(res.Map("LineID"))
			infomachine.Workshop = row.Str(res.Map("Workshop"))
			infomachine.LineType = row.Str(res.Map("LineType"))
			infomachine.LoaderID = row.Int(res.Map("LoaderID"))
			infomachine.LoaderStatus = row.Str(res.Map("LoaderStatus"))
			infomachine.UnloaderID = row.Int(res.Map("UnloaderID"))
			infomachine.UnloaderStatus = row.Str(res.Map("UnloaderStatus"))

		}
		b, err := json.Marshal(infomachine)
		if err != nil {
			checkError(err)
		}
		os.Stdout.Write(b)
		w.Write(b)
	}

}

type StatusPH struct {
	StationID int
	Hours     string
	S0        int
	S1        int
	S2        int
	S3        int
	S4        int
}
type UPHStation struct {
	StationID int
	Hours     string
	UPH       int
}
type RBXS struct {
	PlanDay     int
	Statusphs   []StatusPH
	Uphstations []UPHStation
}

func datatochart(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	lineid := r.FormValue("lineid")
	adays := r.FormValue("adays")
	adate := r.FormValue("adate")
	aunit := r.FormValue("aunit")
	atype := r.FormValue("atype")
	if lineid == "" {
		w.Write([]byte("error input! no lineid"))
		return
	}
	if adays == "" {
		w.Write([]byte("error input! no adays"))
		return
	}
	if adate == "" {
		w.Write([]byte("error input! no adate"))
		return
	}
	if aunit == "" {
		w.Write([]byte("error input! no aunit"))
		return
	}
	if atype == "" {
		w.Write([]byte("error input! no atype"))
		return
	}

	if atype == "0" && aunit == "0" {
		db := opendb()
		defer db.Close()
		var planday int

		res, err := db.Start("select PlanDay from stations where LineID=%s", lineid)
		checkError(err)

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
					fmt.Print("error  col is<NULL>")
					//return
				} else {
					os.Stdout.Write(col.([]byte))
				}
				fmt.Print(" ")
			}
			fmt.Println()
			planday = row.Int(res.Map("PlanDay"))

		}

		res, err = db.Start("select * from status_phour where StationID=%s and to_days(Hours) = to_days(\"%s \")", lineid, adate)
		checkError(err)

		var statusph StatusPH
		var statusphs []StatusPH
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
					fmt.Print("error  col is<NULL>")
					//return
				} else {
					os.Stdout.Write(col.([]byte))
				}
				fmt.Print(" ")
			}
			fmt.Println()
			statusph.StationID = row.Int(res.Map("StationID"))
			statusph.Hours = row.Str(res.Map("Hours"))
			statusph.S0 = row.Int(res.Map("S0"))
			statusph.S1 = row.Int(res.Map("S1"))
			statusph.S2 = row.Int(res.Map("S2"))
			statusph.S3 = row.Int(res.Map("S3"))
			statusph.S4 = row.Int(res.Map("S4"))
			statusphs = append(statusphs, statusph)
		}

		res, err = db.Start("select * from uph_station where StationID=%s and  to_days(Hours) = to_days(\"%s \")", lineid, adate)
		checkError(err)

		var uphstation UPHStation
		var uphstations []UPHStation
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
					fmt.Print("error  col is<NULL>")
					//return
				} else {
					os.Stdout.Write(col.([]byte))
				}
				fmt.Print(" ")
			}
			fmt.Println()
			uphstation.StationID = row.Int(res.Map("StationID"))
			uphstation.Hours = row.Str(res.Map("Hours"))
			uphstation.UPH = row.Int(res.Map("UPH"))
			uphstations = append(uphstations, uphstation)
		}
		var rbxs RBXS
		rbxs.PlanDay = planday
		rbxs.Statusphs = statusphs
		rbxs.Uphstations = uphstations

		b, err := json.Marshal(rbxs)
		if err != nil {
			checkError(err)
		}
		os.Stdout.Write(b)
		w.Write(b)
	}
}
func main() {
	http.HandleFunc("/datatochart", datatochart)               /*datatochart?atype=0&aunit=0&adate=2014-12-12&adays=0&lineid=1 */
	http.HandleFunc("/infoloaderbylineid", infoloaderbylineid) /*infoloaderbylineid?lineid=2&&loader=1*/
	http.HandleFunc("/sidbylinetype", sidbylinetype)           /*sidbylinetype?linetype=" " */
	http.HandleFunc("/sidbyworkshop", sidbyworkshop)           /*/sidbyworkshop?workshop=" " */
	http.HandleFunc("/info_getlt", infogetltypefunc)
	http.HandleFunc("/info_getws", infogetwshopfunc)
	http.HandleFunc("/alarm", alarmfunc)
	http.HandleFunc("/status/", statusfunc)
	http.Handle("/src/", http.StripPrefix("/src/", http.FileServer(http.Dir("./htmlsrc/"))))

	for {
		err := http.ListenAndServe(":8080", nil)
		if err != nil {
			//log.Fatal("ListenAndServer: ", err)
			fmt.Println("ListenAndServer: ", err)

		}
	}
}
