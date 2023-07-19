export default function(context){
    if(!context.$cookies.get('token')){
        return context.redirect('/login')
    }
}