// 3D scrol 

const zSpacing = -1000;
let lastPos = zSpacing / 5;
let frames = document.getElementsByClassName('frame')
let frame_bg = document.getElementsByClassName('frame_bg')

frames = Array.from(frames)
frame_bg = Array.from(frame_bg)
let zVals = []

let start = false
let doRotate = true
let doRotateBack = false 

window.onscroll = function () {

    let top = document.documentElement.scrollTop;
    let delta = lastPos - top;

    lastPos = top;

    frames.forEach( (n, i) => {
        zVals.push(i * zSpacing + zSpacing)
        zVals[i] += delta * -4.8
        let frame = frames[i]
        let transform = `translateZ(${zVals[i]}px)`
        let opacity = zVals[i] < Math.abs(zSpacing) / 1.8 ? 1 : 0            
        frame.setAttribute('style', `transform: ${transform}; opacity: ${opacity}`)
        !opacity ? start = true : start = false 
        if (i > 0 && start && frames[i + 1].attributes.class.nodeValue.split(' ')[2] === 'video') {
            if (delta < 0 && doRotate) {
                addRotate()
                doRotate = false
                doRotateBack = true
            } else if (delta >= 0 && doRotateBack) {
                addRotateBack()
                doRotateBack = false
                doRotate = true
            }
        }
    })

}

function addRotate() {
    let video = document.querySelectorAll("video");
    if (video[0].attributes.class.nodeValue.split(' ').indexOf('rotate-vert-center-end') != -1) {
        clearRotate(1)
    }
    
    video[0].attributes.class.nodeValue = video[0].attributes.class.nodeValue + ' video-ready rotate-vert-center-start'
}

function clearRotate(num) {
    let video = document.querySelectorAll("video");
    let tmp = video[0].attributes.class.nodeValue.split(' ')
    for (let i = 0; i < num; i++) {
        tmp.pop()
    }
    
    video[0].attributes.class.nodeValue = tmp.join(' ')
}

function addRotateBack() {
    clearRotate(2)
    let video = document.querySelectorAll("video");
    video[0].attributes.class.nodeValue += ' rotate-vert-center-end'
}


window.scrollTo(0, 1)