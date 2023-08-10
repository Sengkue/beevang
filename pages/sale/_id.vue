<template>
  <div>
    <div>
      <v-btn tile fixed right color="error" class="mb-10" to="/sale"
        ><v-icon>mdi-close</v-icon> ປິດ</v-btn
      >
    </div>

    <div class="shop-info">
      <div class="d-flex ">
        <div>
          <img src="/logo.png" alt="Shop Logo" class="logo" width="200" />
        </div>
        <div class="ml-5">
          <h2>LM Computer</h2>
          <p>Dongdok, Saythany, Vientiane Capital</p>
          <p>Phone: (020) 7878-0000</p>
        </div>
      </div>
      <div>
        <div>
          <div class="shop-details">
            <p class="bill-date">
              ວັນທີຂາຍ: {{ formatDateLo(getSale.Sale_date) }}
            </p>
            <p v-if="getSale.Em_id !== null" class="bill-date">
              ພະນັກງານຂາຍ: {{ getSale.employeefirst_name }}
            </p>
            <p v-if="getSale" class="bill-date">
              ຜູ້ຊື້: {{ getSale.customerFname }} {{ getSale.customerLname }}
            </p>
            <p v-if="getSale.Cus_id !== null" class="bill-date">
              ເບີໂທ: {{ getSale.customertel }}
            </p>
          </div>
        </div>
        <div></div>
      </div>
      <v-data-table :items="getDetail" :headers="headers" class="product-table">
        <template #[`item.total`]="{ item }">
          <td>{{ formatPrice(item.Totalkip * item.Sale_qty) }}</td>
        </template>
      </v-data-table>
      <div class="d-flex justify-space-between my-5">
        <div>
          <p class="total-price green--text">
            ລວມທັງໝົດ: {{ formatPrice(getSale.Totalkip) }}ກິບ
          </p>
        </div>
        <div>
          <v-btn class="primary white--text" @click="generateAndPrintBill">
            print
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
pdfMake.vfs = pdfFonts.pdfMake.vfs
export default {
  name: 'LmComputerId',

  data() {
    return {
      headers: [
        {
          text: 'Name',
          value: 'productName',
        },
        {
          text: 'Price',
          value: 'Totalkip',
        },
        {
          text: 'Quantity',
          value: 'Sale_qty',
        },
        {
          text: 'Total',
          value: 'total',
        },
      ],
    }
  },
  computed: {
    getDetail() {
      return this.$store.state.sale.saleDetail
    },
    getSale() {
      return this.$store.state.sale.sale
    },
  },
  mounted() {
    this.$store.dispatch('sale/getBysaleId', this.$route.params.id)
    this.$store.dispatch('sale/selectSale', this.$route.params.id)
  },

  methods: {
    generateAndPrintBill(callback) {
      const table = document.querySelector('.v-data-table__wrapper table')
      const clonedTable = table.cloneNode(true)
      const headers = clonedTable.querySelectorAll('thead th')
      const actionsIndex = Array.from(headers).findIndex(
        (header) => header.textContent.trim() === 'Actions'
      )
      if (actionsIndex !== -1) {
        headers[actionsIndex].remove()
        const rows = clonedTable.querySelectorAll('tbody tr')
        rows.forEach((row) => row.children[actionsIndex].remove())
      }

      const printWindow = window.open('', '', 'height=500,width=800')
      printWindow.document.write('<html><head><title>ບິນຂາຍຮ້ານເມໄໝ</title>')
      printWindow.document.write(`
    <style>
     *{
      font-family: Phetsarath ot;
     }
      table {
        border-collapse: collapse;
        margin: 0 auto;
        font-family: 'Noto Sans Lao Looped', serif;
        width: 100%;
      }
      td, th {
        border: 1px solid black;
        padding: 0.5rem;
      }
      .logo {
        width: 80px;
        height: auto;
        margin-right: 10px;
      }
      .shop-info {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
      }
      .shop-details {
        margin-top: 10px;
      }
      .bill-date {
        margin-bottom: 10px;
      }
      .total-price {
        font-weight: bold;
        margin-bottom: 10px;
      }
    </style>
  `)
      printWindow.document.write('</head><body >')

      // Add shop information
      printWindow.document.write(`
    <div class="shop-info">
      <img src="/logo.png" alt="Shop Logo" class="logo" />
      <div class="shop-details">
        <h2>LM Computer</h2>
        <p>Dongdok, Saythany, Vientiane Capital</p>
        <p>Phone: (020) 7878-1525</p>
      </div>
    </div>
  `)

      // Add bill date
      printWindow.document.write(
        `<p class="bill-date">ວັນທີຂາຍ: ${this.formatDateLo(
          this.getSale.sale_date
        )}</p>`
      )
      printWindow.document.write(
        `<p class="bill-date">ພະນັກງານຂາຍ: ${this.getSale.employeefirst_name}</p>`
      )
      printWindow.document.write(
        `<p class="bill-date">ຜູ້ຊີ້: ${this.getSale.customerFname}</p>`
      )
      printWindow.document.write(
        `<p class="bill-date">ເບີ: ${this.getSale.customertel}</p>`
      )

      // Add table
      printWindow.document.write(clonedTable.outerHTML)

      // Add total price
      printWindow.document.write(
        `<p class="total-price">Total Price: ${this.formatPrice(
          this.getSale.Totalkip
        )}ກີບ</p>`
      )

      printWindow.document.write('</body></html>')
      printWindow.document.close()
      printWindow.print()

      // Clear the value after printing is complete
      setTimeout(() => {
        this.value = ''
      }, 1000) // Wait for 1 second before clearing the value

      if (typeof callback === 'function') {
        callback()
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
