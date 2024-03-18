<template>
    <div class="card p-fluid">
      <form @submit.prevent="onlogin">
        <h1>Login</h1>
        <hr/>
        <label for="txt">Username: </label><br/>
        <InputText id="txt" type="text" v-model="taiKhoan" variant="filled"/><br/>
        <label for="psw">Password: </label><br/>
        <Password inputId="psw" :feedback="false" v-model="matKhau" toggleMask style="width: 100%;"/><br/>
        <div>
          <Checkbox v-model="rem" inputId="rem" :binary="true"/>
          <label for="rem">Remembering the password</label>
        </div>
        <table>
          <tr>
            <td><Button @click="onlogin">Submit</Button></td>
            <td><Button>Signup</button></td>
          </tr>
        </table>
      </form>
    </div>
</template>
<script>
import axios from 'axios'
function base64Encode(str) {
  // Encode the string using UTF-8 character encoding
  const utf8Bytes = unescape(encodeURIComponent(str));

  // Convert UTF-8 bytes to base64
  let base64String = '';
  for (let i = 0; i < utf8Bytes.length; i++) {
    base64String += String.fromCharCode(utf8Bytes.charCodeAt(i));
  }
  return btoa(base64String);
}
export default {
  data(){
    return{
        taiKhoan: '',
        matKhau: '',
        rem: false,
        accessToken: '',
      }
  },
  methods:{
    onlogin(){
      const encodedPassword = base64Encode(this.matKhau);
      axios.post('https://api-duk.vnpttravinh.vn/xac-thuc/dang-nhap',
      {taiKhoan: this.taiKhoan, matKhau: encodedPassword})
        .then((response)=>{
          console.log(response.data);
          const status = response.status;
            if (status == 200) {
              localStorage.setItem('accessToken', response.data.data.accessToken);
              this.$router.push('/UserInfo');
            }})
        .catch(function (error) {
          console.log(error.response.data);
        })
      } 
  }
}
</script>

<style>
  h1{
    text-align: center;
    text-transform: uppercase;

  }
  label{
    display: inline-block;
    padding: 5px;
    font-size: 0.6em;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
  }
  form{
    max-width: 420px;
    margin: 30px auto;
    background: white;
    text-align: left;
    padding: 40px;
    border-radius: 10px;
  }
  input{
    width: 100%;
  }
  table{
    width: 100%;
  }
</style>
