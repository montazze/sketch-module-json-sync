import { round } from '../util'

const blurMap = {
  0: 'gaussian',
  1: 'motion',
  2: 'zoom',
  3: 'background'
}

function blurNumberToString (num) {
  if (blurMap[num]) {
    return blurMap[num]
  }
  throw new Error('Unknow blur type. type=' + num)
}

function blurToNumber (str) {
  var keys = Object.keys(blurMap)
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i]
    if (blurMap[key] === str) {
      return parseInt(key)
    }
  }
  throw new Error('Unknow blur type. type=' + str)
}

export function exportBlur (blur) {
  let s = {
    type: blurNumberToString(blur.type()),
    radius: round(blur.radius())
  }

  if (blur.type() == 1) { // motion
    s.angle = round(blur.motionAngle())
  } else if (blur.type() == 2) { // background
    s.center = {
      x: round(blur.center().x),
      y: round(blur.center().y)
    }
  }
  return s
}

export function importBlur (blur) {
  const b = MSStyleBlur.alloc().init()
  b.type = blurToNumber(blur.type)
  b.radius = blur.radius
  b.isEnabled = true
  if (blur.type === 'motion') {
    b.motionAngle = blur.angle
  } else if (blur.type === 'zoom') {
    b.center().x = blur.center.x
    b.center().y = blur.center.y
  }
  return b
}
