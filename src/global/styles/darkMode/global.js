import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
  }
  .apexcharts-xaxis,
  .apexcharts-yaxis {
    text {
      fill: ${({ theme }) => theme.text} !important;
    }
  }
  p {
    color: ${({ theme }) => theme.pColor};
  }
  h2,
  h4 {
    color: ${({ theme }) => theme.text};
  }
  a,
  .link-color {
    color: ${({ theme }) => theme.aLColor};
  }
  .newclass2 {
    background: ${({ theme }) => theme.navbg};
  }
  .copy-address {
    div {
      svg {
        path {
          fill: ${({ theme }) => theme.svgCopyColor};
        }
      }
    }
  }
  // .fileName {
  //   span {
  //     color: ${({ theme }) => theme.aLColor};
  //   }
  // }
  .MobileHeaderLogo {
    background-color:  ${({ theme }) => theme.resNavTopBg}; 
    .bg {
      svg {
        path {
          fill: ${({ theme }) => theme.resBoaBg};
        }
      }
  }
    .byBosagora {
      .boaIcon {
          background-color:  ${({ theme }) => theme.boaIconBg}; 
          svg {
              path {
                  fill:  ${({ theme }) => theme.boaIconColor};
              }
          }
      }
  }
  }
  .Mobile-Header {
    .navbar-nav {
      background-color:  ${({ theme }) => theme.resNavBg}; 
      p,
      span {
        color: ${({ theme }) => theme.text};
      }
    }
  }
  .MobileHeaderInner {
    li:first-child,
    li:nth-child(7) {
      border-bottom: 1px solid ${({ theme }) => theme.trBrBColor};
    }
    li {
      a {
        color: ${({ theme }) => theme.text};
      }
      svg {
        path {
          fill: ${({ theme }) => theme.text}; 
        }
      }
    }
  }
  .dropdown-net {
    .dropdown-toggle {
      background-color: ${({ theme }) => theme.netbg};
    }
    .dropdown-menu {
      background-color: ${({ theme }) => theme.netbg};
      .dropdown-item,
      .dropdown-item:hover {
        background-color: ${({ theme }) => theme.netbg};
      }
    }
  }
  .custom-border {
    border-top: 1px solid ${({ theme }) => theme.borderColor};
  }
  #dashboard {
    .dashboard-top {
      background: url(${({ theme }) => theme.topbg}) no-repeat;
    }
    .coin-blocktime {
     .icon-coin {
        h4 {
          color: ${({ theme }) => theme.BOAColor};
        }
      }
      
    }
    .marketcap-value {
      .coin-marektcap {
        p {
          color: ${({ theme }) => theme.pColor};
        }
      }
      .coin-marketval {
        p {
          color: ${({ theme }) => theme.pColor};
        }
      }
    }
    .marketcap-vol {
      background-color: ${({ theme }) => theme.mBgColor};
      border: 1px solid ${({ theme }) => theme.borderColor};
      p {
        color: ${({ theme }) => theme.pColor};
      }
    }
    .market-items {
      .card {
        border-bottom: 1px solid ${({ theme }) => theme.borderColor};
        .icon {
           svg {
             path {
              fill: ${({ theme }) => theme.aLColor};
             }
           }
        }
        .values {
          .title {
          h4 {
            color: ${({ theme }) => theme.aLColor};
          }
        }
      }
      }
    }
    .market-values {
      .card {
        border: 1px solid ${({ theme }) => theme.borderColor};
        .title {
          svg {
            path {
              fill: ${({ theme }) => theme.pTitleColor};
            }
          }
          p {
            color: ${({ theme }) => theme.pTitleColor};
          }
          &:hover {
            svg {
              path {
                fill: ${({ theme }) => theme.aLColor};
              }
            }
            p {
              color:  ${({ theme }) => theme.aLColor};
            }
          }
        }
        .values {
          h4 {
            color: ${({ theme }) => theme.mValColor};
          }
          p {
            color: ${({ theme }) => theme.pValColor};
          }
        }
      }
    }
    .btns {
      .btn {
        background-color: ${({ theme }) => theme.bBgColor};
        border: 1px solid ${({ theme }) => theme.bBrColor};
      }
    }
  }
  .bt-bottom {
    a {
      background-color: ${({ theme }) => theme.aBgColor};
      border: 1px solid ${({ theme }) => theme.aBrColor};
      color: ${({ theme }) => theme.aTColor}; 
      &:hover {
        color: ${({ theme }) => theme.aThColor} !important; 
      }
    }
  }
  table {
    tr {
      border-bottom: 1px solid ${({ theme }) => theme.trBrBColor};
    }
    th {
      color: ${({ theme }) => theme.thColor};
    }
    td {
      color: ${({ theme }) => theme.tdColor};
    }
    tbody {
      tr:hover {
        background-color: ${({ theme }) => theme.trBgColor};
      }
    }
  }
  .table-footer {
    .show-list {
      p {
        color: ${({ theme }) => theme.pColor};
      }
      .select-cont {
        div {
          svg {
            path {
              fill: ${({ theme }) => theme.caretbg};
            }
          }
        }
      }
      // select {
      //   background: url(${({ theme }) => theme.caretbg}) no-repeat calc(100% - 10px) !important;
      // }
      .form-control {
        border: 1px solid ${({ theme }) => theme.borderColor};
        color: ${({ theme }) => theme.pColor};
        option {
          background-color: ${({ theme }) => theme.optionBgColor};
          color: ${({ theme }) => theme.optionPColor};
        }
      }
    }
    .csv-dld {
      p {
        color: ${({ theme }) => theme.pTitleColor};
      }
      .btn {
        color: ${({ theme }) => theme.linkColor} !important;
        svg {
          path {
            fill: ${({ theme }) => theme.linkColor};
          }
        }
      }
    }
    li:first-child,
    li:last-child,
    li {
      a {
        color: ${({ theme }) => theme.pTitleColor};
      }
    }  
    li {
      a {
        border-bottom: 1px solid  ${({ theme }) => theme.body};
      }
    }   
    li.active {
      a {
        border-bottom: 1px solid ${({ theme }) => theme.linkColor} !important;
        color: ${({ theme }) => theme.linkColor};
      }
    }
  }
  #footer {
    background-color: ${({ theme }) => theme.footerBgColor};
  }
  #generic-search-bar {
    .input-group {
      border: 1px solid ${({ theme }) => theme.borderColor};
  }
    .form-control {
        background-color: ${({ theme }) => theme.inputBgColor};
        color: ${({ theme }) => theme.pColor};
    }
    .btn {
      background-color: ${({ theme }) => theme.searchBtnBgColor} ;
      svg {
          color: ${({ theme }) => theme.searchIconColor};
      }
    }
  }
  #search-bar {
    .form-control {
        background-color: ${({ theme }) => theme.searchInBgColor};
    }
    .btn {
      background-color: ${({ theme }) => theme.searchBtnColor} !important;
      svg {
          color: ${({ theme }) => theme.searchIcon2Color};
      }
    }
  }
  .block-detail {
    .block-hash {
      border-bottom: 1px solid ${({ theme }) => theme.trBrBColor};
      p {
        color: ${({ theme }) => theme.itemPColor}
      }
    }
  }
  .qr-res {
    border-bottom: 1px solid ${({ theme }) => theme.trBrBColor};
  }
  .validator-detail,
.more-detail {
  border-bottom: 1px solid ${({ theme }) => theme.trBrBColor} !important;
  .item {
    border-bottom: 1px solid ${({ theme }) => theme.trBrBColor};
    p {
      color: ${({ theme }) => theme.itemPColor};
    }
  }
  // .item:first-child {
  //   border-top: 1px solid ${({ theme }) => theme.trBrBColor};
  // }
  .item:last-child {
    border-bottom: 1px solid ${({ theme }) => theme.trBrBColor} !important;
  }
  // .copy-address {
  //   span {
  //     color: ${({ theme }) => theme.adrsPColor};
  //   }
  // }
}
.io-detail {
  .row {
    border-bottom: 1px solid ${({ theme }) => theme.trBrBColor};
    &:hover {
      background-color:  ${({ theme }) => theme.trBrBColor};
    }
  }
    p {
      color: ${({ theme }) => theme.itemPColor};
    }
    .value {
      color: ${({ theme }) => theme.pColor}
    }
    @media(max-width: 480px){
      .item-list {
        .item {
          border-bottom: 1px solid ${({ theme }) => theme.trBrBColor} !important;
        }
      }
    }

}
.validator-transactions-tabs {
  .nav-tabs {
    .nav-link {
      border: 1px solid ${({ theme }) => theme.trBrBColor};
      color: ${({ theme }) => theme.tabColor};
    }
  }
}
.voting-reward-tabs {
  .nav-tabs {
    border-bottom: 1px solid ${({ theme }) => theme.trBrBColor};
    .nav-link {
      color: ${({ theme }) => theme.tabColor};
      border-bottom: 3px solid ${({ theme }) => theme.body} !important;
      &:hover {
        border-bottom: 3px solid ${({ theme }) => theme.linkColor};
      }
    }
    .nav-link.active {
      color: ${({ theme }) => theme.linkColor};
      border-bottom: 3px solid ${({ theme }) => theme.linkColor} !important;
    }
  }
}
.qr-res {
  .btn {
      color: ${({ theme }) => theme.linkColor} !important;
  }
}
.validators,
.enrolled {
  .btn {
    color: ${({ theme }) => theme.linkColor} !important;
    border: 1px solid ${({ theme }) => theme.trBrBColor};
  }
}
.transactions {
  .io-container {
    border: 1px solid ${({ theme }) => theme.trBrBColor};
    &:hover {
      background-color:  ${({ theme }) => theme.trBrBColor};
    }
    p {
      color: ${({ theme }) => theme.itemPColor};
      span {
        color: ${({ theme }) => theme.bwColor};
      }
    }
    .address_list {
      div {
        border-top: 1px solid ${({ theme }) => theme.trBrBColor};
      }
    }
    .total-bal {
      span {
        background-color: ${({ theme }) => theme.tBalColor};
      }
    }
    b {
      color: ${({ theme }) => theme.bwColor};
    }
    .amount {
      color: ${({ theme }) => theme.pColor};
    }
  }
  .more-detail {
    .total-bal {
      background-color: ${({ theme }) => theme.tBalColor};
    }
  }
}

#transaction-overview {
  .io-container {
    border-bottom: 1px solid ${({ theme }) => theme.trBrBColor};
    &:hover {
      background-color:  ${({ theme }) => theme.trBrBColor};
    }
    p {
      color: ${({ theme }) => theme.itemPColor};
      span {
        color: ${({ theme }) => theme.bwColor};
      }
    }
    .total-bal {
      span {
        background-color: ${({ theme }) => theme.tBalColor};
      }
    }
    b {
      color: ${({ theme }) => theme.bwColor};
    }
    .amount {
      color: ${({ theme }) => theme.pColor};
    }
    .address_list {
      div {
        border-top: 1px solid ${({ theme }) => theme.trBrBColor};
      }
    }
  }
  @media (max-width: 480px) {
    .block-detail {
      .block-hash {
        border-bottom: 1px solid ${({ theme }) => theme.trBrBColor} !important;
      }
    }
  }
}
.more-detail {
  .total-bal {
    span {
      background-color: ${({ theme }) => theme.tBalColor};
    }
  }
  @media (max-width: 767px) {
    .progress-item {
      border-top: 1px solid ${({ theme }) => theme.trBrBColor} !important;
    }
  }
  @media (max-width: 480px) {
    .brdr {
      border-bottom: 1px solid ${({ theme }) => theme.trBrBColor};
    }
  }
}
// .io-detail {
//   .item-list {
//     .item {
//       border-bottom: 1px solid ${({ theme }) => theme.trBrBColor};
//     }
//   }
// }
#proposals {
  .swiper-container {
    background-color: ${({ theme }) => theme.proContColor};
  }
  .proposal-Cont {
    .proposal-box {
      background-color: ${({ theme }) => theme.proBoxColor};
      box-shadow: 0px 0px 20px 0px  ${({ theme }) => theme.proBoxShadowColor};
      .bt-header {
        span {
          background-color: ${({ theme }) => theme.statusBgColor};
        }
      }
      .gift-cont {
        div {
          color: ${({ theme }) => theme.itemPColor};
        }
        .black {
          color: ${({ theme }) => theme.bwColor};
        }
       
      }
      .proposal-list {
        li {
          color: ${({ theme }) => theme.itemPColor};
          .green-check {
            background-color: ${({ theme }) => theme.greenColor};
          }
          .red-check {
            background-color: ${({ theme }) => theme.redColor};
          }
        }
      }
    }
  }
}
.proposals {
  table {
    td:nth-child(6) {
      color: ${({ theme }) => theme.itemPColor};
    }
  }
}

#proposal-details {
.more-detail {
  .item:first-child {
       border-top: 1px solid ${({ theme }) => theme.trBrBColor};
    }
  }
}

#holders {
  .card {
    border: 1px solid ${({ theme }) => theme.borderColor} !important;
    .title {
      svg {
        path {
          fill: ${({ theme }) => theme.pTitleColor};
        }
      }
      p {
        color: ${({ theme }) => theme.pTitleColor};
      }
    }
    .values {
      h4 {
        color: ${({ theme }) => theme.mValColor};
      }
      p {
        color: ${({ theme }) => theme.pValColor};
      }
    }
  }
}
#analytic-chart {
  .item {
    p {
      color: ${({ theme }) => theme.itemPColor};
    }
  }
}
.recommend-fee {
  p {
    color: ${({ theme }) => theme.itemPColor};
  }
  span {
    background-color: ${({ theme }) => theme.statusBgColor};
    color: ${({ theme }) => theme.linkColor};
  }
}
.lmh-fee {
  .card {
    border: 1px solid ${({ theme }) => theme.borderColor} !important;
      p {
        color: ${({ theme }) => theme.pColor};
      }
      .medium {
        color: ${({ theme }) => theme.aLColor};
      }
    }
  }
  .feeCalculatorcont {
    border: 1px solid ${({ theme }) => theme.borderColor} !important;
    .title {
      color: ${({ theme }) => theme.text};
    }
    .feeInputbox {
      h3,h2 {
        color: ${({ theme }) => theme.aLColor};
      }
      .input-field {
        background-color: ${({ theme }) => theme.feeInbgColor};
        border: 1px solid ${({ theme }) => theme.feeInBrColor} !important;
        .size {
          color: $secondary-color;
          background-color: ${({ theme }) => theme.feeInbgColor};
        }
        input {
          background-color: ${({ theme }) => theme.feeInbgColor};
          color: ${({ theme }) => theme.text};
        }
      }
    }
  }
  #terms-conditions {
    .date,
    .title,
    .sub_title {
      color: ${({ theme }) => theme.text};
    }
    li,
    p {
      color: ${({ theme }) => theme.itemPColor};
    }
    span {
      color: ${({ theme }) => theme.itemPColor};
    }
  }
  #languages {
    .active {
      background-color: ${({ theme }) => theme.proContColor};
    }
    .card {
      border: 1px solid ${({ theme }) => theme.borderColor};
      &:hover {
        background-color:  ${({ theme }) => theme.trBrBColor} !important;
      }
      .icon {
        img {
          border: 1px solid ${({ theme }) => theme.borderColor};
        }
      }
      p {
        color: ${({ theme }) => theme.pColor};
      }
    }
  }
  @media (max-width: 991px) {
    .navbar-collapse {
      background: ${({ theme }) => theme.navbg};
    }
}
::-webkit-scrollbar-track {
  background-color:   ${({ theme }) => theme.scrollTrackBg};
}

// ::-webkit-scrollbar {
//   background-color: #f5f5f5;
// }

::-webkit-scrollbar-thumb {
  background-color:  ${({ theme }) => theme.scrollThumBg};
}
.apexcharts-tooltip.apexcharts-theme-light {
  background: ${({ theme }) => theme.body} !important;
  border: 1px solid ${({ theme }) => theme.borderColor};
}
#notfound {
  background: ${({ theme }) => theme.body};
  .notfound {
    h2 {
      color: ${({ theme }) => theme.PNFlink};
    }
    a {
      border: 1px solid ${({ theme }) => theme.PNFlink};
      color: ${({ theme }) => theme.PNFlink};
    }
  }
}
`