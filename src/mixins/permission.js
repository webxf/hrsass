import permissionPoint from '@/constant/permission.js'


export default{
    data(){
        return{
            point: permissionPoint,
        }  
    },
    methods: {
        isHasPermission(permission) {
            return this.$store.state.permission.points.includes(permission)
          },
    },
}