import LayoutHome from './pages/home/layout/LayoutHome'
import css from './styles/index.module.css'

function App() {

  const handleButtonClick = () => {
    window.open("https://github.com/filipelimavaz", "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <div className={css.app}>
        <LayoutHome ></LayoutHome>
        <button onClick={handleButtonClick} className={css.github_button}><i className="fa-brands fa-github"></i></button>
      </div>
    </>
  )
}

export default App
