import Header from '../components/Header'
import Body from '../components/Body'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Body />
      </main>
      <Footer />
    </div>
  )
}