import { render } from 'react-dom';
import * as React from 'react';
import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, WorkWeek, Month, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';

import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import axios from "axios";
import api from '../../api/api.json'
import './Schedule.css'
/**
 * Schedule editor template sample
 */
const EditorTemplate =()=>{
     const [data,setData]=React.useState([]);
     const [isLoading,setIsLoading]=React.useState(false);


    React.useEffect(()=>{
        axios.get(api.mainIp+api.getSchedule).then(function (response) {
            //console.log(response.data)
            for (let key in response.data) {
                let hash = {
                    Subject: response.data[key].event_name,
                    EndTime: response.data[key].end_time,
                    StartTime: response.data[key].start_time
                }
                data.push(hash);
                setData(data)
                console.log(data);
            }
            setIsLoading(true);
        });
    },[])
    const onEventRendered=(args)=> {
        switch (args.data.EventType) {
            case 'Requested':
                args.element.style.backgroundColor = '#F57F17';
                break;
            case 'Confirmed':
                args.element.style.backgroundColor = '#7fa900';
                break;
            case 'New':
                // console.log(args.data.Subject);
                // console.log(args.data.EventType);
                // console.log(args.data.StartTime);
                // console.log(args.data.EndTime);
                // let date=new Date(args.data.StartTime);
                // console.log(date.getDate())
                // console.log(date.getMonth())
                // console.log(date.getFullYear())
                // console.log(date.getHours())
                // console.log(date.getMinutes())
                // console.log(date.getSeconds())


                args.element.style.backgroundColor = '#8e24aa';
                break;
        }
    }
    const  checkTime=(i)=> {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }
    const onActionBegin=(args)=> {
        if (args.requestType === 'eventCreate' || args.requestType === 'eventChange') {
            //console.log(args)
            let data = args.data instanceof Array ? args.data[0] : args.data;
           // console.log(data);
            let fromDate=new Date(data.StartTime);
            let toDate=new Date(data.EndTime);
            let month=fromDate.getMonth()+1;
             month=checkTime(month);
             let day=fromDate.getDate();
             day=checkTime(day)
            let hours=fromDate.getHours();
             hours=checkTime(hours);
             let min=fromDate.getMinutes();
             min=checkTime(min);
             let monthTo=toDate.getMonth()+1;
             monthTo=checkTime(monthTo);
             let dayTo=toDate.getDate();
             dayTo=checkTime(dayTo)
            let hoursTo=toDate.getHours();
             hoursTo=checkTime(hoursTo);
             let minTo=toDate.getMinutes();
             minTo=checkTime(minTo);
            let fDate=fromDate.getFullYear()+"-"+month+"-"+day+" "+hours+":"+min+":00";
            let tDate=toDate.getFullYear()+"-"+monthTo+"-"+dayTo+" "+hoursTo+":"+minTo+":00";
            const dataObj = {
                user_name: 'thj',
                group_name: 'group_name',
                event_name: data.Subject,
                start_time: fDate,
                end_time: tDate,
            };
            const headers = {
                'Content-Type': 'application/json',
            };

            axios.post(api.mainIp+api.scheduler,dataObj,{headers})
                .then(function (response){
                console.log(response);
            })


           //  if (!this.scheduleObj.isSlotAvailable(data.StartTime, data.EndTime)) {
           //      args.cancel = true;
           //  }
        }
    }
   const editorTemplate=(props)=> {
        return ((props !== undefined) ? <table className="custom-event-editor" style={{ width: '100%', cellpadding: '5' }}><tbody>
        <tr><td className="e-textlabel">Summary</td><td style={{ colspan: '4' }}>
            <input id="Summary" className="e-field e-input" type="text" name="Subject" style={{ width: '100%' }}/>
        </td></tr>
        <tr><td className="e-textlabel">From</td><td style={{ colspan: '4' }}>
            <DateTimePickerComponent id="StartTime" format='dd/MM/yy hh:mm a' data-name="StartTime" value={new Date(props.startTime || props.StartTime)} className="e-field"></DateTimePickerComponent>
        </td></tr>
        <tr><td className="e-textlabel">To</td><td style={{ colspan: '4' }}>
            <DateTimePickerComponent id="EndTime" format='dd/MM/yy hh:mm a' data-name="EndTime" value={new Date(props.endTime || props.EndTime)} className="e-field"></DateTimePickerComponent>
        </td></tr>

        </tbody></table> : <div></div>);
    }

    let data1;
    return (
<>
    <div className='schedule-control-section'>
        {isLoading &&
            <div className='col-lg-12 control-section'>
                <div className='control-wrapper'>
                    <ScheduleComponent width='100%' height='500px' selectedDate={new Date()}
                                       ref={schedule => data1 = schedule} eventSettings={{dataSource: data}}
                                       editorTemplate={editorTemplate.bind(this)} actionBegin={onActionBegin.bind(this)}
                                       showQuickInfo={false} eventRendered={onEventRendered}>
                        <ViewsDirective>
                            <ViewDirective option='Day'/>
                            <ViewDirective option='Week'/>
                            <ViewDirective option='WorkWeek'/>
                            <ViewDirective option='Month'/>
                        </ViewsDirective>
                        <Inject services={[Day, Week, WorkWeek, Month, Resize, DragAndDrop]}/>
                    </ScheduleComponent>
                </div>
            </div>
        }
        <br></br>
        
    </div>
   
</>
    );
    }


export default EditorTemplate;
