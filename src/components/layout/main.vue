<template>
  <section class="body">
    <header class="header">
      <chp-top-bar></chp-top-bar>
    </header>
    <div class="inner-wrapper">

        <chp-left-side-bar></chp-left-side-bar>

      <section class="content-body">
        <header class="page-header">
          <chp-page-header></chp-page-header>
        </header>
        <!---start page--->
        <slot name="content-body"></slot>
        <!---end page--->
      </section>
    </div>
    <aside class="sidebar-right" id="sidebar-right">
      <chp-right-side-bar></chp-right-side-bar>
    </aside>
  </section>
</template>
