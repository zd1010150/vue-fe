<template>
  <section class="body">
    <chp-top-bar></chp-top-bar>

    <div class="inner-wrapper">

      <chp-left-side-bar></chp-left-side-bar>
       <section role="main" class="content-body">
       <chp-page-header></chp-page-header>
       <slot name="content-body"></slot>

      </section>
    </div>
    <aside class="sidebar-right" id="sidebar-right">
      <chp-right-side-bar></chp-right-side-bar>
    </aside>
  </section>
</template>
