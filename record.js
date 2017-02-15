<script>
        function record_aud_play_pause(){
                var audio = document.getElementById('record');
                if (audio.paused) {
                  audio.play();
                } else {
                  audio.pause();
                }}
            
            var context;
            var buffer;
            var onFail = function(e) {
                console.log('Rejected!', e);
              };

            function onSuccess(s) {
                context = new AudioContext();
                buffer = context.createBuffer(2, 22050, 44100);
                var mediaStreamSource = context.createMediaStreamSource(s);
                recorder = new Recorder(mediaStreamSource);
                recorder.record();
                // audio loopback
                // mediaStreamSource.connect(context.destination);
            }

            window.URL = window.URL || window.webkitURL;
            navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

            var recorder;
            var audio = document.getElementById('record');

            function record() {
                navigator.mediaDevices.getUserMedia({audio: true})
                .then(function(s){
                onSuccess(s);                                            
                })
               .catch(function(err) { 
                      console.log('navigator.mediaDevices.getUserMedia not present');
                })
            }
            function stop() {
                var audio = document.getElementById('record');
                if (recorder){
                    recorder.stop();
                    recorder.exportWAV(function(s) {
                    audio.src = window.URL.createObjectURL(s);
                    });
                };
                if (context.state !="closed"){
                    context.close()}
                }
        </script> 