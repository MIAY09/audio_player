let slider = document.querySelector('#audio_position input')
let play_pause_btn = document.querySelector('#play_pause')
let backward_btn = document.querySelector('#backward')
let forward_btn = document.querySelector('#forward')
let current_time = document.querySelector('#current_time')
let all_time = document.querySelector('#all_time')
let volume_btn = document.querySelector('.volume')
let is_mutes_volume = false
let is_playing_audio = false
let slider_volume = document.querySelector('#volume_slider input')
let slider_volume_holder = document.querySelector('#volume_slider')


let audio_duration_in_minutes
let audio = new Audio('audio/audio1.mp3')
let audio_duration



let is_set_time_position = false



let song_index = 0



let songs = ['audio1', 'audio2']



audio.addEventListener('loadedmetadata', () =>{
    audio_duration = audio.duration
    audio_duration_in_minutes = (audio_duration/60).toFixed(2)
    all_time.textContent = audio_duration_in_minutes
    slider.setAttribute('max', audio_duration)
})
audio.addEventListener('timeupdate', ()=>{
    current_time.textContent = (audio.currentTime/60).toFixed(2)
    if(is_set_time_position == false){
        slider.value = audio.currentTime
    }
    if(current_time.textContent == all_time.textContent){
        NextSong()
    }
    slider_input()
})


play_pause_btn.addEventListener('click', () =>{
    if(is_playing_audio){
        audio.pause()
        is_playing_audio = false
    }
    else{
        audio.play()
        is_playing_audio = true
    }
})



slider.addEventListener('mousedown', ()=>{
    is_set_time_position = true
})
slider.addEventListener('mouseup', ()=>{
    is_set_time_position = false
    audio.currentTime = slider.value
})
backward_btn.addEventListener('click', ()=>{
    audio.currentTime -= 15
})
forward_btn.addEventListener('click', ()=>{
    audio.currentTime += 15 
})


let last_volume


volume_btn.addEventListener('click', ()=>{
    if(is_mutes_volume){
        setMute(true)
        audio.volume = last_volume
        setVisualValueInParcent(last_volume * 100)
    }
    else{
        last_volume = audio.volume
        setMute(false)
        setVisualValueInParcent(0)
    }
})

function NextSong(){
    song_index++
    if(songs.length == song_index){
        song_index = 0
    }
    audio.src = "Audio/" + songs[song_index] + ".mp3"
    audio.play()
}

slider.addEventListener("input", ()=>{
    slider_input()
})
function slider_input(){
    value_percent = (slider.value / slider.max) *100
    slider.style.background = `linear-gradient(to right, #8079E4 ${value_percent}%, #DEDEF4 ${value_percent}%)`
}
slider_input()


// volume slider


slider_volume.addEventListener("input", ()=>{
    sliderVolumeInput()
})

function sliderVolumeInput(){
    value_percent = (slider_volume.value / slider_volume.max) * 100
    slider_volume.style.background = `linear-gradient(to right, #8079E4 ${value_percent}%, #DEDEF4 ${value_percent}%)`
    if(value_percent <= 0){
        setMute(false)
    }
    else{
        setMute(true)
    }
    audio.volume = value_percent/100
}
sliderVolumeInput()


function setMute(state){
    if(state == true){
        is_mutes_volume = false
        volume_btn.classList.remove("volume_off")
    }
    else{
        audio.volume = 0
        is_mutes_volume = true
        volume_btn.classList.add("volume_off")
    }
}
function setVisualValueInParcent(parcent){
    slider_volume.style.background = `linear-gradient(to right, #8079E4 ${parcent}%, #DEDEF4 ${parcent}%)`
}


volume_btn.addEventListener("mouseover", () =>{
    slider_volume_holder.classList.remove("hide_volume_slider")
})
volume_btn.addEventListener("mouseout", () =>{
    slider_volume_holder.classList.add("hide_volume_slider")
})

slider_volume_holder.addEventListener("mouseover", ()=>{
    slider_volume_holder.classList.remove("hide_volume_slider")
})
slider_volume_holder.addEventListener("mouseout", ()=>{
    slider_volume_holder.classList.add("hide_volume_slider")
})