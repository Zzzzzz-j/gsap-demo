<template>
  <div class="demo1">
    <div class="wrapper">
    <div class="boxes" ref="boxesContainer">
      <div 
        v-for="(cover, index) in COVERS"
        :key="index"
        class="box"
        :style="`--src: url(${cover})`"
      >
        <span>{{ index + 1 }}</span>
        <img :src="cover" alt="Album cover">
      </div>
      <div class="controls">
        <button class="next" @click="prev">
          <span>Previous album</span>
          <svg viewBox="0 0 448 512" width="100" title="Previous Album">
            <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"/>
          </svg>
        </button>
        <button class="prev" @click="next">
          <span>Next album</span>
          <svg viewBox="0 0 448 512" width="100" title="Next Album">
            <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"/>
          </svg>
        </button>
      </div>
    </div>
    <svg class="scroll-icon" viewBox="0 0 24 24">
      <path fill="currentColor" d="M20 6H23L19 2L15 6H18V18H15L19 22L23 18H20V6M9 3.09C11.83 3.57 14 6.04 14 9H9V3.09M14 11V15C14 18.3 11.3 21 8 21S2 18.3 2 15V11H14M7 9H2C2 6.04 4.17 3.57 7 3.09V9Z"/>
    </svg>
    <div class="drag-proxy"></div>
  </div>
  </div>
</template>
<script lang="ts" setup>
import './index.scss';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, Draggable)

const COVERS = [
  "https://i.scdn.co/image/ab67616d00001e020ecc8c4fd215d9eb83cbfdb3",
  "https://i.scdn.co/image/ab67616d00001e02d9194aa18fa4c9362b47464f",
  "https://i.scdn.co/image/ab67616d00001e02a7ea08ab3914c5fb2084a8ac",
  "https://i.scdn.co/image/ab67616d00001e0213ca80c3035333e5a6fcea59",
  "https://i.scdn.co/image/ab67616d00001e02df04e6071763615d44643725",
  "https://i.scdn.co/image/ab67616d00001e0239c7302c04f8d06f60e14403",
  "https://i.scdn.co/image/ab67616d00001e021c0bcf8b536295438d26c70d",
  "https://i.scdn.co/image/ab67616d00001e029bbd79106e510d13a9a5ec33",
  "https://i.scdn.co/image/ab67616d00001e021d97ca7376f835055f828139",
  "https://www.udiscovermusic.com/wp-content/uploads/2015/10/Kanye-West-Yeezus.jpg",
]

const boxesContainer = ref(null)
let LOOP, LOOP_HEAD, SCRUB, TRIGGER
let iteration = 0
const PLAYHEAD = { position: 0 }

const POSITION_WRAP = gsap.utils.wrap(0, 1)
const SNAP = gsap.utils.snap(1 / COVERS.length)

onMounted(() => {
  initAnimations()
  setupEventListeners()
})

onBeforeUnmount(() => {
  TRIGGER?.kill()
  LOOP_HEAD?.kill()
  SCRUB?.kill()
  LOOP?.kill()
})

function initAnimations() {
  gsap.set('.box', { 
    yPercent: -50,
    display: 'block'
  })

  const BOXES = gsap.utils.toArray('.box')
  LOOP = gsap.timeline({ paused: true, repeat: -1, ease: 'none' })

  const STAGGER = 0.1
  const DURATION = 1
  const SHIFTS = [...BOXES, ...BOXES, ...BOXES]

  SHIFTS.forEach((BOX: any, index) => {
    const BOX_TL = gsap.timeline()
      .set(BOX, { xPercent: 250, rotateY: -50, opacity: 0, scale: 0.5 })
      .to(BOX, { opacity: 1, scale: 1, duration: 0.1 }, 0)
      .to(BOX, { opacity: 0, scale: 0.5, duration: 0.1 }, 0.9)
      .fromTo(BOX, { xPercent: 250 }, { 
        xPercent: -350, 
        duration: 1, 
        ease: 'power1.inOut' 
      }, 0)
      .fromTo(BOX, { rotateY: -50 }, { 
        rotateY: 50, 
        duration: 1, 
        ease: 'power4.inOut' 
      }, 0)
      .to(BOX, { 
        z: 100, 
        scale: 1.25, 
        duration: 0.1, 
        repeat: 1, 
        yoyo: true 
      }, 0.4)
      .fromTo(BOX, { zIndex: 1 }, { 
        zIndex: BOXES.length, 
        repeat: 1, 
        yoyo: true, 
        duration: 0.5 
      }, 0)

    LOOP.add(BOX_TL, index * STAGGER)
  })

  const CYCLE_DURATION = STAGGER * BOXES.length
  const START_TIME = CYCLE_DURATION + DURATION * 0.5

  LOOP_HEAD = gsap.fromTo(LOOP, { totalTime: START_TIME }, {
    totalTime: `+=${CYCLE_DURATION}`,
    duration: 1,
    ease: 'none',
    repeat: -1,
    paused: true
  })

  SCRUB = gsap.to(PLAYHEAD, {
    position: 0,
    onUpdate: () => LOOP_HEAD.totalTime(POSITION_WRAP(PLAYHEAD.position)),
    paused: true,
    duration: 0.25,
    ease: 'power3'
  })

  TRIGGER = ScrollTrigger.create({
    start: 0,
    end: '+=2000',
    horizontal: false,
    pin: boxesContainer.value,
    onUpdate: handleScrollUpdate
  })
}

function handleScrollUpdate(self) {
  const SCROLL = self.scroll()
  if (SCROLL > self.end - 1) {
    wrap(1, 1)
  } else if (SCROLL < 1 && self.direction < 0) {
    wrap(-1, self.end - 1)
  } else {
    const NEW_POS = (iteration + self.progress) * LOOP_HEAD.duration()
    SCRUB.vars.position = NEW_POS
    SCRUB.invalidate().restart()
  }
}

function wrap(iterationDelta, scrollTo) {
  iteration += iterationDelta
  TRIGGER.scroll(scrollTo)
  TRIGGER.update()
}

function progressToScroll(progress) {
  return gsap.utils.clamp(1, TRIGGER.end - 1, gsap.utils.wrap(0, 1, progress) * TRIGGER.end)
}

function scrollToPosition(position) {
  const SNAP_POS = SNAP(position)
  const PROGRESS = (SNAP_POS - LOOP_HEAD.duration() * iteration) / LOOP_HEAD.duration()
  const SCROLL = progressToScroll(PROGRESS)
  if (PROGRESS >= 1 || PROGRESS < 0) return wrap(Math.floor(PROGRESS), SCROLL)
  TRIGGER.scroll(SCROLL)
}

function handleKeyPress(e) {
  if (e.code === 'ArrowLeft' || e.code === 'KeyA') prev()
  if (e.code === 'ArrowRight' || e.code === 'KeyD') next()
}

function handleBoxClick(e) {
  const BOX = e.target.closest('.box')
  if (BOX) {
    const BOXES = gsap.utils.toArray('.box')
    const TARGET = BOXES.indexOf(BOX)
    const CURRENT = gsap.utils.wrap(0, BOXES.length, Math.floor(BOXES.length * SCRUB.vars.position))
    let BUMP = TARGET - CURRENT
    
    if (TARGET > CURRENT && TARGET - CURRENT > BOXES.length * 0.5) {
      BUMP = (BOXES.length - BUMP) * -1
    }
    if (CURRENT > TARGET && CURRENT - TARGET > BOXES.length * 0.5) {
      BUMP = BOXES.length + BUMP
    }
    
    scrollToPosition(SCRUB.vars.position + BUMP * (1 / BOXES.length))
  }
}

function next() {
  scrollToPosition(SCRUB.vars.position - 1 / COVERS.length)
}

function prev() {
  scrollToPosition(SCRUB.vars.position + 1 / COVERS.length)
}

function setupEventListeners() {
  document.addEventListener('keydown', handleKeyPress)
  boxesContainer.value.addEventListener('click', handleBoxClick)

  Draggable.create('.drag-proxy', {
    type: 'x',
    trigger: '.box',
    onPress() {
      this.startOffset = SCRUB.vars.position
    },
    onDrag() {
      SCRUB.vars.position = this.startOffset + (this.startX - this.x) * 0.001
      SCRUB.invalidate().restart()
    },
    onDragEnd() {
      scrollToPosition(SCRUB.vars.position)
    }
  })
}
</script>
