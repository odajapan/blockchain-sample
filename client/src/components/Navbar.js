import React from 'react'
 
const Navbar = () => {
 return (
   <nav>
       <div className="logo">
           <h2>BlockChains</h2>
       </div>
       <ul className="navLinks">
           <li>Market</li>
           <li>Exchange</li>
           <li>BlockChain</li>
           <li>Wallet</li>
       </ul>
       <button>Login</button>
   </nav>
 )
}
 
export default Navbar