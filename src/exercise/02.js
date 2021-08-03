import * as React from 'react'
import {Switch} from '../switch'

const ToggleContext = React.createContext()
ToggleContext.displayName = 'ToggleContext'
function Toggle({children}) {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)
  const value = {on, toggle}
  return (
    <ToggleContext.Provider value={value}>{children}</ToggleContext.Provider>
  )
}
function useToggle() {
  const context = React.useContext(ToggleContext)
  if (!context) {
    throw new Error('useToggle must be used with a <Toggle/>')
  }
  return context
}

//  if you care only about direct decent
// return React.Children.map(children, child => {
//   if (allowedTypes.includes(child.type)) {
//     const newChild = React.cloneElement(child, {on, toggle})
//     return newChild
//   }
//   return child
// })

const ToggleOn = ({children}) => {
  const {on} = useToggle()
  return on ? children : null
}
const ToggleOff = ({children}) => {
  const {on} = useToggle()
  return on ? null : children
}

const ToggleButton = props => {
  const {on, toggle} = useToggle()
  return <Switch on={on} onClick={toggle} {...props} />
}
const MyToggleButton = () => {
  const {on} = useToggle()
  return <>{on ? 'the button is on yo' : 'the button is off sooo'}</>
}

const allowedTypes = [ToggleOn, ToggleOff, ToggleButton]
const App = () => <ToggleButton />
// function App() {
//   return (
//     <div>
//       <Toggle>
//         <ToggleOn>The button is on</ToggleOn>
//         <ToggleOff>The button is off</ToggleOff>
//         <ToggleButton />
//         <span />
//         <MyToggleButton />
//       </Toggle>
//     </div>
//   )
// }

export default App

/*
eslint
  no-unused-vars: "off",
*/
