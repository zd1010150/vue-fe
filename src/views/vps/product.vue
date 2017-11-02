<template lang="html">
  <section class="vps">
     <header>
       <div class="col-md-6">
         <h4>Mine</h4>
         <span class="text-primary">(Activated)</span>
       </div>
       <div class="col-md-6">
          <chp-button class="btn btn-danger" v-if="product.status == 'active'">
            <i class="fa fa-ban" aria-hidden="true"></i>
            Deactive
          </chp-button>
          <chp-button class="btn btn-primary" v-else-if="product.status == 'unActive'">
            Active
          </chp-button>
          <chp-button class="btn btn-primary" v-else-if="product.status == 'canUpdate'">
            <i class="fa fa-level-up" aria-hidden="true"></i>
          Upgrade
          </chp-button>
       </div>

     </header>
     <div class="body">
      <div class="product">
        35 per month |
        2 cores processor +
        4G memory
      </div>
      <p class="description"></p>
      <div class="row">
        <div class="col-md-6 col-xs-12">
          <section class="panel panel-featured-left panel-featured-primary">
									<div class="panel-body">
										<div class="widget-summary widget-summary-xs">
											<div class="widget-summary-col widget-summary-col-icon">
												<div class="summary-icon bg-primary">
													<i class="fa fa-sign-in" aria-hidden="true"></i>
												</div>
											</div>
											<div class="widget-summary-col">
												<div class="summary">
													<h4 class="title">Login VPS</h4>
												</div>
											</div>
										</div>
									</div>
								</section>
        </div>
        <div class="col-md-6 col-xs-12">

        </div>
      </div>
     </div>
  </section>
</template>

<script>
export default {
  data(){
    return {
      product: {
        status:
      }
    }
  }
}
</script>

<style lang="css">
</style>
