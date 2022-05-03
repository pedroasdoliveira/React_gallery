import './Footer.css'
import {FaGithub} from 'react-icons/fa'
import {SiLinkedin} from 'react-icons/si'

const Footer = () => {
  return (
    <div className='Footer'>
        <div className='Footer__description'>
            <p>Dev: Pedro Oliveira</p>
        </div>
        <div className='Footer__link'>
            <a href="https://github.com/pedroasdoliveira/React_gallery" target="_blank">
                <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/pedro-augusto-silva-de-oliveira/" target="_blank">
                <SiLinkedin />
            </a>
        </div>
    </div>
  )
}

export default Footer