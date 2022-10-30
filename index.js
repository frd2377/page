const video = document.getElementById('video')
const boton = document.getElementById('boton')
const detener = document.getElementById('detener')
let chunks = []

const permisos = async()=>{
    const stream = await navigator.mediaDevices.getUserMedia({video:true})
    const mediaRecorder = new MediaRecorder(stream)
    video.srcObject = stream
    console.log(mediaRecorder.state);
    if (mediaRecorder.state == 'inactive') {
        mediaRecorder.start()
    }
    console.log(mediaRecorder.state);
    mediaRecorder.requestData()
    mediaRecorder.addEventListener('dataavailable',(e)=>{
        if(e.data.size > 0){
            chunks.push(e.data)
        }
    })

    mediaRecorder.addEventListener('stop',()=>{
        let blob = new Blob(chunks, {
            type: 'video/webm'
        });
        let url = URL.createObjectURL(blob);
        let a = document.createElement('a');
        document.body.appendChild(a);
        a.style = 'display: none';
        a.href = url;
        a.download = 'test.webm';
        a.click();
        window.URL.revokeObjectURL(url);
        chunks = []
    })

    detener.addEventListener('click',()=>{
        if (mediaRecorder.state == 'recording') {
            mediaRecorder.stop()
        }
    })
}

boton.addEventListener('click',permisos)
