import InfoForm from '../InfoForm/InfoForm'
import Bracket from '../Bracket/TheBracket'

const Routes = [
    {  
        path:'/Info',
        component:InfoForm,
        exact:false
    },
    {
        path:'/Bracket',
        component: Bracket,
        exact:false
    }
]

export default Routes