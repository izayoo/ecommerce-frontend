<template>
  <v-container class="ua"></v-container>
</template>
<style lang="scss">
@media screen and (max-width:480px) {
  .ua {
    .title {
      font-size: 24px !important;
    }

    p {
      font-size: 14px !important;
    }
  }
}

.ua {
  .title {
    font-size: 25px !important;
  }

  p {
    font-size: 14px !important;
  }

  p {
    margin-bottom: 20px;
  }

  ol {
    list-style-type: none;
    counter-reset: item;
    margin: 0;
    padding: 0;
  }

  ol>li {
    display: table;
    counter-increment: item;
    margin-bottom: 2rem;
  }

  ol>li:before {
    content: counters(item, ".") ". ";
    display: table-cell;
    padding-right: 0.6em;
  }

  li ol>li {
    margin: 10px 0 10px 0;
  }

  li ol>li:before {
    content: counters(item, ".") " ";
  }
}
</style>