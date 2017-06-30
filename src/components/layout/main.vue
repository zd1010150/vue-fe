<template>
  <section class="body">

    <chp-left-side-bar></chp-left-side-bar>

    <div class="inner-wrapper">

      <header class="header">
        <chp-top-bar></chp-top-bar>
      </header>

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
