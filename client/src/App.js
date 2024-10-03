import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Home } from "./Components/Home"
import { BookDetails } from "./Components/BookDetails"
import { ShoppingCart } from "./Components/ShoppingCart"
import { PaymentPage } from "./Components/PaymentPage"

export const App = () => {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/bookdetails", element: <BookDetails /> },
    { path: "/shoppingcart", element: <ShoppingCart /> },
    { path: "/paymentpage", element: <PaymentPage /> }
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}