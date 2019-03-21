const arrows = document.querySelectorAll('.arrow')
const topText = document.querySelector('#top-text')
const bottomText = document.querySelector('#bottom-text')
const leftText = document.querySelector('#left-text')
const rightText = document.querySelector('#right-text')

const today = new Date()
const dd = today.getDate()
const mm = today.getMonth() + 1
const yyyy = String(today.getFullYear()).slice(2, 4)
const date = `${dd}.${mm.length > 1 ? mm : `0${mm}`}.${yyyy}`

leftText.innerHTML = date
rightText.innerHTML = today.toLocaleTimeString()

const timer = () => {
  const d = new Date()
  const time = d.toLocaleTimeString()
  rightText.innerHTML = time
}

setInterval(timer, 1000)

document.addEventListener('mousemove', e => {
  const mouseX = e.pageX
  const mouseY = e.pageY

  Array.from(arrows).map(arrow => {
    const imgX = arrow.offsetLeft + arrow.offsetWidth
    const imgY = arrow.offsetTop + arrow.offsetHeight

    const diffX = mouseX - imgX
    const diffY = mouseY - imgY

    const radians = Math.atan2(diffY, diffX)
    const angle = (radians * 180) / Math.PI

    const getCoord = divider => {
      return Math.abs(Math.round(angle / divider))
    }

    const addZero = value => {
      return value < 10 ? `0${value}` : value
    }

    topText.innerHTML = `${diffY > 0 ? 'S' : 'N'} ${addZero(
      getCoord(2),
    )}° ${addZero(getCoord(3))}' ${addZero(getCoord(1.5))}.${addZero(
      getCoord(2.5),
    )}"`

    bottomText.innerHTML = `${diffX > 0 ? 'E' : 'W'} ${addZero(
      getCoord(3),
    )}° ${addZero(getCoord(4))}' ${addZero(getCoord(0.5))}.${addZero(
      getCoord(4.5),
    )}"`

    arrow.style.transform = `rotate(${angle}deg)`
  })
})
