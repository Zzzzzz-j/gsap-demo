<template>
  <div class="demo2">
    <div id="page" class="site">
      <div id="feather" class="feather"></div>

      <header id="masthead" class="site-header">
        <nav class="anchor-nav">
          <a href="#intro" class="anchor" @click.prevent="handleNavClick">Home</a>
          <a href="#panel-1" class="anchor" @click.prevent="handleNavClick">Panel 1</a>
          <a href="#panel-3" class="anchor" @click.prevent="handleNavClick">Panel 3</a>
          <a href="#panel-5" class="anchor" @click.prevent="handleNavClick">Panel 5</a>
          <a href="#map" class="anchor" @click.prevent="handleNavClick">Map</a>
        </nav>
      </header>

      <div id="content" class="site-content">
        <section id="intro" class="full-screen pt-5 gradient-orange">
          <h1>A title</h1>
          <div id="clouds-layer-1" class="clouds"></div>
          <div id="clouds-layer-2" class="clouds"></div>
        </section>

        <section id="panels">
          <div id="panels-container" class="panels-container" ref="panelsContainer" :style="{ width: `${panels.length * 100}%` }">
            <article v-for="(panel, index) in panels" :key="panel.id" :id="panel.id" class="panel full-screen"
              :class="`gradient-${panel.gradient}`">
              <div class="container">
                <div class="row">
                  <div class="col-6">
                    <img src="" alt="">
                  </div>
                  <div class="col-6 d-flex flex-column">
                    <h2>{{ panel.title }}</h2>
                    <p class="step-description">
                      {{ panel.content }}
                    </p>
                    <div class="panels-navigation" :class="{ 'text-right': !panel.next }">
                      <div v-if="panel.prev" class="nav-panel" data-sign="minus">
                        <a :href="`#${panel.prev}`" class="anchor" @click.prevent="handleNavClick">Prev</a>
                      </div>
                      <div v-if="panel.next" class="nav-panel" data-sign="plus">
                        <a :href="`#${panel.next}`" class="anchor" @click.prevent="handleNavClick">Next</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section id="map" class="full-screen gradient-orange"></section>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import './index.scss';
import { gsap } from 'gsap'
import { ScrollToPlugin, ScrollTrigger } from 'gsap/all'

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)

const panelsContainer = ref(null)
let tween = null

const panels = ref([
  {
    id: 'panel-1',
    title: 'Panel 1',
    gradient: 'green',
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Including versions of Lorem Ipsum.',
    next: 'panel-2'
  },
  {
    id: 'panel-2',
    title: 'Panel 2',
    gradient: 'blue',
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Including versions of Lorem Ipsum.',
    prev: 'panel-1',
    next: 'panel-3'
  },
  {
    id: 'panel-3',
    title: 'Panel 3',
    gradient: 'green',
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Including versions of Lorem Ipsum.',
    prev: 'panel-2',
    next: 'panel-4'
  },
  {
    id: 'panel-4',
    title: 'Panel 4',
    gradient: 'blue',
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Including versions of Lorem Ipsum.',
    prev: 'panel-3',
    next: 'panel-5'
  },
  {
    id: 'panel-5',
    title: 'Panel 5',
    gradient: 'green',
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Including versions of Lorem Ipsum.',
    prev: 'panel-4'
  }
])

const handleNavClick = (e) => {
  e.preventDefault()
  const target = e.target.getAttribute('href')
  const targetElem = document.querySelector(target)

  if (targetElem?.parentElement === panelsContainer.value) {
    console.log('position', tween.scrollTrigger.start, tween.scrollTrigger.end);
    const totalScroll = tween.scrollTrigger.end - tween.scrollTrigger.start
    const totalMovement = (panels.value.length - 1) * targetElem.offsetWidth
    const y = Math.round(
      tween.scrollTrigger.start +
      (targetElem.offsetLeft / totalMovement) * totalScroll
    )

    gsap.to(window, {
      scrollTo: { y, autoKill: false },
      duration: 1
    })
  }
}

onMounted(() => {
  const panelElements = gsap.utils.toArray("#panels-container .panel")

  tween = gsap.to(panelElements, {
    xPercent: -100 * (panelElements.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: "#panels-container",
      pin: true,
      start: "top top",
      scrub: 2,
      snap: {
        snapTo: 1 / (panelElements.length - 1),
        inertia: false,
        duration: { min: 0.1, max: 0.1 }
      },
      end: () => `+=${panelsContainer.value.offsetWidth - innerWidth}`
    }
  })
})
</script>
