const fs = require('fs');
const os = require('os');

const EventEmitter= require('events')

class MyEmitter extends EventEmitter {
    log(message){
        this.emit("message",{message}) //emit(eventName, [args]) is a method of EventEmitter.
        
    }
}

const obj_emitter=new MyEmitter()

const logfile ="./eventlog.txt"

const logtoFile=(event)=>{  //logtoFile is a function that takes an event object.
    // That event comes from your emit("message", {message}) call.

    const logMessage=`${new Date().toISOString()} -${event.message} \n`
    fs.appendFileSync(logfile,logMessage)
}

obj_emitter.on('message',logtoFile)

setInterval(()=>{
  const memoryuse=  os.freemem()/os.totalmem()*100
  obj_emitter.log(`current memory uses: ${memoryuse.toFixed(2)}`)
},3000)

obj_emitter.log("Application Started")
obj_emitter.log("Application event occured")