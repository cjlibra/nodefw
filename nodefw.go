package main

import (
	"flag"
	"os"
	"os/signal"
	"strconv"

	"github.com/ziutek/mymysql/mysql"
	_ "github.com/ziutek/mymysql/native" // Native engine
	//"html"
	//"log"
	//"net/url"
	// _ "github.com/ziutek/mymysql/thrsafe" // Thread safe engine

	"encoding/json"
	"fmt"
	"github.com/golang/glog"
	"net/http"
	//"os"
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
		//panic("ERROR: " + error.Error()) // terminate program
		glog.Errorln("ERROR: " + error.Error())
	}
}
func opendb() mysql.Conn {

	db := mysql.New("tcp", "", "127.0.0.1:3306", "android_server", "123456", "nodefw")

	err := db.Connect()
	if err != nil {
		glog.Errorln("数据库无法连接")
		return nil
	}
	return db

}
func statusfunc(w http.ResponseWriter, r *http.Request) {

	glog.Info(r.RemoteAddr)
	glog.Infoln("设备状态")

	db := opendb()
	if db == nil {
		return
	}
	defer db.Close()
	res, err := db.Start("select * from stations_status")
	checkError(err)

	// Print fields names
	var logstr string
	for _, field := range res.Fields() {
		//fmt.Print(field.Name, " ")
		logstr += field.Name + " "

	}
	//glog.V(1).Infoln(logstr)

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
	//os.Stdout.Write(b)
	glog.V(2).Infoln(string(b))
	w.Write(b)

}
func alarmfunc(w http.ResponseWriter, r *http.Request) {

	r.ParseForm() //解析参数，默认是不会解析的

	glog.Info(r.RemoteAddr)
	glog.Infoln("活动告警", " ", r.FormValue("stationid"))
	//fmt.Fprintf(w, "Hi, I love you %s", html.EscapeString(r.URL.Path[1:]))
	if r.Method == "GET" {
		//fmt.Println("method:", r.Method) //获取请求的方法
		stationid := r.FormValue("stationid")
		//w.Write([]byte(stationid[0]))

		if stationid == "" {
			//w.Write([]byte("error input! no stationid"))
			glog.Errorln("error input! no stationid")
			return
		} else {
			//fmt.Println(stationid)
			_, err := strconv.Atoi(stationid)
			if err != nil {
				//w.Write([]byte("error input! no num"))
				glog.Errorln("error input! no num")
				return
			}
			db := opendb()
			if db == nil {
				return
			}
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
			//os.Stdout.Write(b)
			glog.V(2).Infoln(string(b))
			w.Write(b)
		}
	}
}

type WorkShop struct {
	WorkShop string
}

func infogetwshopfunc(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	glog.Info(r.RemoteAddr)
	glog.Infoln("获取车间")
	db := opendb()
	if db == nil {
		return
	}
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

		workshop.WorkShop = row.Str(res.Map("Workshop"))

		workshops = append(workshops, workshop)
	}
	b, err := json.Marshal(workshops)
	if err != nil {
		checkError(err)
	}
	//os.Stdout.Write(b)
	glog.V(2).Infoln(string(b))
	w.Write(b)

}

type LineType struct {
	Linetype string
}

func infogetltypefunc(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	glog.Info(r.RemoteAddr)
	glog.Infoln("获取制程")
	db := opendb()
	if db == nil {
		return
	}
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

		linetype.Linetype = row.Str(res.Map("LineType"))

		linetypes = append(linetypes, linetype)
	}
	b, err := json.Marshal(linetypes)
	if err != nil {
		checkError(err)
	}
	//os.Stdout.Write(b)
	glog.V(2).Infoln(string(b))
	w.Write(b)
}

type SID struct {
	Sid int
}

func sidbyworkshop(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	workshop := r.FormValue("workshop")
	glog.Info(r.RemoteAddr)
	glog.Infoln("获取车间号", " ", workshop)
	if workshop == "" {
		w.Write([]byte("error input! no  workshop"))
		return
	} else {
		db := opendb()
		if db == nil {
			return
		}
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

			sid.Sid = row.Int(res.Map("LineID"))

			sids = append(sids, sid)
		}
		b, err := json.Marshal(sids)
		if err != nil {
			checkError(err)
		}
		//os.Stdout.Write(b)
		glog.V(2).Infoln(string(b))
		w.Write(b)

	}

}

func sidbylinetype(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	linetype := r.FormValue("linetype")
	glog.Info(r.RemoteAddr)
	glog.Infoln("获取制程号", linetype)
	if linetype == "" {
		//w.Write([]byte("error input! no  linetype"))
		glog.Errorln("error input! no  linetype")
		return
	} else {
		db := opendb()
		if db == nil {
			return
		}
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

			sid.Sid = row.Int(res.Map("LineID"))

			sids = append(sids, sid)
		}
		b, err := json.Marshal(sids)
		if err != nil {
			checkError(err)
		}
		//os.Stdout.Write(b)
		glog.V(2).Infoln(string(b))
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
	glog.Info(r.RemoteAddr)
	glog.Infoln("设备详情", " ", "站号：", lineid, "收放板机标示：", loader)
	_, err := strconv.Atoi(loader)
	if err != nil {
		//w.Write([]byte("error input loader! no num"))
		glog.Errorln("error input loader! no num")
		return
	}
	if lineid == "" {
		//w.Write([]byte("error input! no lineid"))
		glog.Errorln("error input! no lineid")
		return
	} else {
		//fmt.Println(stationid)
		_, err := strconv.Atoi(lineid)
		if err != nil {
			//w.Write([]byte("error input! no num"))
			glog.Errorln("error input! no num")
			return
		}
		db := opendb()
		if db == nil {
			return
		}
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
		//os.Stdout.Write(b)
		glog.V(2).Infoln(string(b))
		w.Write(b)
	}

}

type PLAN struct {
	PlanBan   int
	PlanDay   int
	PlanMonth int
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
type RBXS struct { //日报	小时
	Plan        PLAN
	Statusphs   []StatusPH
	Uphstations []UPHStation
}
type StatusPD struct {
	StationID int
	Days      string
	S0        int
	S1        int
	S2        int
	S3        int
	S4        int
}
type UPDStation struct {
	StationID int
	Days      string
	UPD       int
}
type YBRI struct { //月报	日   //自定义1 日
	Plan        PLAN
	Statuspds   []StatusPD
	Updstations []UPDStation
}
type StatusPS struct {
	StationID int
	Days      string
	S1_S0     int
	S1_S1     int
	S1_S2     int
	S1_S3     int
	S1_S4     int
	S2_S0     int
	S2_S1     int
	S2_S2     int
	S2_S3     int
	S2_S4     int
	S3_S0     int
	S3_S1     int
	S3_S2     int
	S3_S3     int
	S3_S4     int
}
type UPSStation struct {
	StationID int
	Days      string
	Shift1    int
	Shift2    int
	Shift3    int
}
type ZDYB struct { //自定义2  班
	Plan        PLAN
	Statuspss   []StatusPS
	Upsstations []UPSStation
}

func datatochart(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	lineid := r.FormValue("lineid")
	adays := r.FormValue("adays")
	adate := r.FormValue("adate")
	aunit := r.FormValue("aunit")
	atype := r.FormValue("atype")
	glog.Info(r.RemoteAddr)
	glog.Infoln("统计图表", " ", "站号：", lineid, "统计天数： ", adays, "统计日期：", adate, " ", aunit, " ", atype)
	if lineid == "" {
		//w.Write([]byte("error input! no lineid"))
		glog.Errorln("error input! no lineid")
		return
	}
	_, err := strconv.Atoi(lineid)
	if err != nil {
		//w.Write([]byte("error input! no num"))
		glog.Errorln("lineid error input! no num")
		return
	}
	if adays == "" {
		//w.Write([]byte("error input! no adays"))
		glog.Errorln("error input! no adays")
		return
	}
	if adate == "" {
		//w.Write([]byte("error input! no adate"))
		glog.Errorln("error input! no adate")
		return
	}
	if aunit == "" {
		//w.Write([]byte("error input! no aunit"))
		glog.Errorln("error input! no aunit")
		return
	}
	if atype == "" {
		//w.Write([]byte("error input! no atype"))
		glog.Errorln("error input! no atype")
		return
	}

	db := opendb()
	if db == nil {
		return
	}
	defer db.Close()
	var plan PLAN

	res, err := db.Start("select PlanBan,PlanDay,PlanMonth from stations where LineID=%s", lineid)
	checkError(err)

	for {
		row, err := res.GetRow()
		checkError(err)

		if row == nil {
			// No more rows
			break
		}

		plan.PlanBan = row.Int(res.Map("PlanBan"))
		plan.PlanDay = row.Int(res.Map("PlanDay"))
		plan.PlanMonth = row.Int(res.Map("PlanMonth"))

	}
	//////////////////////////////////////////////////////////
	if atype == "0" && aunit == "0" { //日报 小时

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

			uphstation.StationID = row.Int(res.Map("StationID"))
			uphstation.Hours = row.Str(res.Map("Hours"))
			uphstation.UPH = row.Int(res.Map("UPH"))
			uphstations = append(uphstations, uphstation)
		}
		var rbxs RBXS
		rbxs.Plan = plan
		rbxs.Statusphs = statusphs
		rbxs.Uphstations = uphstations

		b, err := json.Marshal(rbxs)
		if err != nil {
			checkError(err)
		}
		//os.Stdout.Write(b)
		glog.V(2).Infoln(string(b))
		w.Write(b)
	}

	///////////////////////////////////////////////////////
	if atype == "1" && aunit == "1" { //月报 日

		res, err = db.Start("select * from status_pday where StationID=%s and MONTH(Days) = MONTH(\"%s \") and YEAR(Days) = YEAR(\"%s \")", lineid, adate, adate)
		checkError(err)

		var statuspd StatusPD
		var statuspds []StatusPD
		for {
			row, err := res.GetRow()
			checkError(err)

			if row == nil {
				// No more rows
				break
			}

			statuspd.StationID = row.Int(res.Map("StationID"))
			statuspd.Days = row.Str(res.Map("Days"))
			statuspd.S0 = row.Int(res.Map("S0"))
			statuspd.S1 = row.Int(res.Map("S1"))
			statuspd.S2 = row.Int(res.Map("S2"))
			statuspd.S3 = row.Int(res.Map("S3"))
			statuspd.S4 = row.Int(res.Map("S4"))
			statuspds = append(statuspds, statuspd)
		}

		res, err = db.Start("select * from upd_station where StationID=%s and  MONTH(Days) = MONTH(\"%s \") and YEAR(Days) = YEAR(\"%s \")", lineid, adate, adate)
		checkError(err)

		var updstation UPDStation
		var updstations []UPDStation
		for {
			row, err := res.GetRow()
			checkError(err)

			if row == nil {
				// No more rows
				break
			}

			updstation.StationID = row.Int(res.Map("StationID"))
			updstation.Days = row.Str(res.Map("Days"))
			updstation.UPD = row.Int(res.Map("UPD"))
			updstations = append(updstations, updstation)
		}
		var ybri YBRI
		ybri.Plan = plan
		ybri.Statuspds = statuspds
		ybri.Updstations = updstations

		b, err := json.Marshal(ybri)
		if err != nil {
			checkError(err)
		}
		//os.Stdout.Write(b)
		glog.V(2).Infoln(string(b))
		w.Write(b)
	}

	///////////////////////////////////////////////////////
	if atype == "2" && aunit == "1" { //自定义1 日

		res, err = db.Start("select * from status_pday where StationID=%s and to_days(Days) - to_days(\"%s \") >= 0 and to_days(Days) - to_days(\"%s \") <= %s", lineid, adate, adate, adays)
		checkError(err)

		var statuspd StatusPD
		var statuspds []StatusPD
		for {
			row, err := res.GetRow()
			checkError(err)

			if row == nil {
				// No more rows
				break
			}

			statuspd.StationID = row.Int(res.Map("StationID"))
			statuspd.Days = row.Str(res.Map("Days"))
			statuspd.S0 = row.Int(res.Map("S0"))
			statuspd.S1 = row.Int(res.Map("S1"))
			statuspd.S2 = row.Int(res.Map("S2"))
			statuspd.S3 = row.Int(res.Map("S3"))
			statuspd.S4 = row.Int(res.Map("S4"))
			statuspds = append(statuspds, statuspd)
		}

		res, err = db.Start("select * from upd_station where StationID=%s and  to_days(Days)- to_days(\"%s \") >= 0 and to_days(Days) - to_days(\"%s \") <= %s ", lineid, adate, adate, adays)
		checkError(err)

		var updstation UPDStation
		var updstations []UPDStation
		for {
			row, err := res.GetRow()
			checkError(err)

			if row == nil {
				// No more rows
				break
			}

			updstation.StationID = row.Int(res.Map("StationID"))
			updstation.Days = row.Str(res.Map("Days"))
			updstation.UPD = row.Int(res.Map("UPD"))
			updstations = append(updstations, updstation)
		}
		var zdyr YBRI
		zdyr.Plan = plan
		zdyr.Statuspds = statuspds
		zdyr.Updstations = updstations

		b, err := json.Marshal(zdyr)
		if err != nil {
			checkError(err)
		}
		//os.Stdout.Write(b)
		glog.V(2).Infoln(string(b))
		w.Write(b)
	}

	//////////////////////////////////////////////////////////
	if atype == "3" && aunit == "2" { //自定义2 班

		res, err = db.Start("select * from status_pshift where StationID=%s and  to_days(Days) - to_days(\"%s \") >= 0 and   to_days(Days) - to_days(\"%s \") <= %s", lineid, adate, adate, adays)
		checkError(err)

		var statusps StatusPS
		var statuspss []StatusPS
		for {
			row, err := res.GetRow()
			checkError(err)

			if row == nil {
				// No more rows
				break
			}

			statusps.StationID = row.Int(res.Map("StationID"))
			statusps.Days = row.Str(res.Map("Days"))
			statusps.S1_S0 = row.Int(res.Map("S1_S0"))
			statusps.S1_S1 = row.Int(res.Map("S1_S1"))
			statusps.S1_S2 = row.Int(res.Map("S1_S2"))
			statusps.S1_S3 = row.Int(res.Map("S1_S3"))
			statusps.S1_S4 = row.Int(res.Map("S1_S4"))
			statusps.S2_S0 = row.Int(res.Map("S2_S0"))
			statusps.S2_S1 = row.Int(res.Map("S2_S1"))
			statusps.S2_S2 = row.Int(res.Map("S2_S2"))
			statusps.S2_S3 = row.Int(res.Map("S2_S3"))
			statusps.S2_S4 = row.Int(res.Map("S2_S4"))
			statusps.S3_S0 = row.Int(res.Map("S3_S0"))
			statusps.S3_S1 = row.Int(res.Map("S3_S1"))
			statusps.S3_S2 = row.Int(res.Map("S3_S2"))
			statusps.S3_S3 = row.Int(res.Map("S3_S3"))
			statusps.S3_S4 = row.Int(res.Map("S3_S4"))
			statuspss = append(statuspss, statusps)
		}

		res, err = db.Start("select * from ups_station where StationID=%s and to_days(Days) - to_days(\"%s \") >= 0 and to_days(Days) - to_days(\"%s \") <= %s ", lineid, adate, adate, adays)
		checkError(err)

		var upsstation UPSStation
		var upsstations []UPSStation
		for {
			row, err := res.GetRow()
			checkError(err)

			if row == nil {
				// No more rows
				break
			}

			upsstation.StationID = row.Int(res.Map("StationID"))
			upsstation.Days = row.Str(res.Map("Days"))
			upsstation.Shift1 = row.Int(res.Map("Shift_1"))
			upsstation.Shift2 = row.Int(res.Map("Shift_2"))
			upsstation.Shift3 = row.Int(res.Map("Shift_3"))
			upsstations = append(upsstations, upsstation)
		}
		var zdyb ZDYB
		zdyb.Plan = plan
		zdyb.Statuspss = statuspss
		zdyb.Upsstations = upsstations

		b, err := json.Marshal(zdyb)
		if err != nil {
			checkError(err)
		}
		//os.Stdout.Write(b)
		glog.V(2).Infoln(string(b))
		w.Write(b)
	}
}

var _ = fmt.Println

func main() {
	flag.Parse()

	http.HandleFunc("/datatochart", datatochart)               /*datatochart?atype=0&aunit=0&adate=2014-12-12&adays=0&lineid=1 */
	http.HandleFunc("/infoloaderbylineid", infoloaderbylineid) /*infoloaderbylineid?lineid=2&&loader=1*/
	http.HandleFunc("/sidbylinetype", sidbylinetype)           /*sidbylinetype?linetype=" " */
	http.HandleFunc("/sidbyworkshop", sidbyworkshop)           /*/sidbyworkshop?workshop=" " */
	http.HandleFunc("/info_getlt", infogetltypefunc)
	http.HandleFunc("/info_getws", infogetwshopfunc)
	http.HandleFunc("/alarm", alarmfunc)
	http.HandleFunc("/status/", statusfunc)
	http.Handle("/src/", http.StripPrefix("/src/", http.FileServer(http.Dir("./htmlsrc/"))))

	glog.Info("程序启动，开始监听8080端口")
	defer func() {
		glog.Infoln("成功退出")
		glog.Flush()
	}()

	cstr := make(chan os.Signal, 1)
	go func() {
		for {
			err := http.ListenAndServe(":8080", nil)
			if err != nil {
				//log.Fatal("ListenAndServer: ", err)
				fmt.Println("ListenAndServer: ", err)

			}
		}
	}()
	signal.Notify(cstr)
	glog.Infoln("收到信号：", <-cstr)
}
