<template>
  <div class="d-flex flex-md-row flex-column" style="gap: 10px; width: 100%;">
    <div class="banner-container left-banner">
      <img v-if="subBanners[0]" class="banner-container__img" :src="subBanners[0].media?.getFullUrl()" alt="">
    </div>
    <div class="banner-container left-banner">
      <img v-if="subBanners[1]" class="banner-container__img" :src="subBanners[1].media?.getFullUrl()" alt="">
    </div>
    <!-- <div class="banner-container">
      <img class="banner-container__img" src="/img/banner/Right-Side-Banner-660x185.jpg" alt="">
      <div class="banner">
        <p class="banner__product text-bold text-color-secondary mb-4">
          Download the latest App <br />
          for the best experience!
        </p>
        <div class="dl-btn d-flex">
          <img src="/img/App-Store.png" class="mr-2" width="120" />
          <img src="/img/Google-Play.png" width="120" />
        </div>
      </div>
    </div> -->
  </div>
</template>

<script lang="ts" setup>
const { getSubBanners, subBanners } = useBanner()
getSubBanners()
</script>
<style lang="scss">
.row-col-padding-banner:nth-child(odd) {
  padding-right: 5px !important;
}

.row-col-padding-banner:nth-child(even) {
  padding-left: 5px !important;
}

@media screen and (max-width: 959px) {
  .row-col-padding-banner:nth-child(odd) {
    padding-right: 0 !important;
    margin-bottom: 12px;
  }

  .row-col-padding-banner:nth-child(even) {
    padding-left: 0 !important;
  }
}

.banner-container {
  position: relative;
  display: flex;
  align-items: center;
  height: fit-content;
  width: 100%;
  &__img {
    width: 100%;
    border-radius: 25px !important;
  }

  .banner {
    padding-left: 30px;
    position: absolute;

    &__header {
      font-size: 40px !important;
    }

    &__product {
      font-size: 1.125rem;
    }

    &__price {
      font-size: 1.125rem;
    }
  }
}

@media screen and (max-width:431px) {
  .banner-container {
    .banner {
      .dl-btn {
        img {
          width: 80px;
          height: 30px;
        }
      }

      &__product {
        font-size: 15px;
        margin-bottom: 5px !important;
      }

      &__header {
        font-size: 23px !important;
      }
    }
  }
}

@media screen and (max-width: 480px) {
  .left-banner {
    display: none;
  }

  .banner-container {
    .banner {
      &__product {
        font-size: 14px;
      }
    }
  }
}
</style>