const message = document.querySelector('#message');

function writeText(){
    let index = 0;
    const text = "THIS IS A SAMPLE TEXT WRITTEN FOR DEMO ONLY";
    return function repeat(){
        setInterval(()=>{
        if(index>text.length)
            index=0;
        const displayText = text.slice(0,index);
        index++;
        message.innerHTML=displayText;

    },200);
    }
}

writeText()();
