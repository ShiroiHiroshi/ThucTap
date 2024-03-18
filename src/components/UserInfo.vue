<template>
  <div class="container">
    <h1>Thông tin cá nhân</h1>
    <hr/>
      <div class="card-body" v-for="thongTin in thongTins" :key="thongTin.nguoiDungID">
        <table>
          <tr>
            <td  v-if="thongTin.ten" class="td1"><i class="pi pi-user"></i> Tên</td>
            <td>{{ thongTin.ten }}</td>
            <td v-if="thongTin.chucVu" class="td1"><i class="pi pi-briefcase"></i> Chức vụ</td>
            <td>{{ thongTin.chucVu }}</td>
            <td v-if="thongTin.congTacID" class="td1"><i class="pi pi-id-card"></i>Cộng tác ID</td>
            <td>{{ thongTin.congTacID }}</td>
            <td v-if="thongTin.donVi" class="td1"><i class="pi pi-info-circle"></i> Đơn vị</td>
            <td>{{ thongTin.donVi }}</td>
          </tr>
          <tr>
            <td v-if="thongTin.loaiNguoiDung" class="td1">Loại người dùng</td>
            <td>{{ thongTin.loaiNguoiDung }}</td>
            <td v-if="thongTin.nguoiDungID" class="td1"><i class="pi pi-id-card"></i> ID Người dùng</td>
            <td>{{ thongTin.nguoiDungID }}</td>
          </tr>
        </table>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'UserInfo',
  data(){
    return{
      thongTins: [],
    }
  },
  mounted(){
    
    const accessToken = localStorage.getItem('accessToken');
    axios({
      url: 'https://api-duk.vnpttravinh.vn/xac-thuc/thong-tin-nguoi-dung',
      method: 'get',
      headers:{'x-access-token': accessToken,
              'Content-Type': 'application/json'}
              })
    .then((response)=>{
      console.log(response.data);
      const status = response.status;
      if (status == 200) {
        this.thongTins = response.data.data;
        this.$emit('update:ten', this.thongTins.ten);
      }
    })
    .catch((error) => {
      console.error(error.response.data);
    });
  }
}
</script>

<style scoped>
  .container {
  margin-top: 20px;
}

.card {
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

.card-body {
  padding: 20px;
}
span{
  border-radius: 40%;
  background-color: #aaaa;
  padding: 1px;
}
.td1{
  background-color: #aaaa;
  border: 2px solid #aaaa;
  border-radius: 50px;
  padding: 5px;
}
</style>