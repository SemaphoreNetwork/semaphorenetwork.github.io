import Footer from 'components/Footer';
import Header from './components/Header';
import heroImage from 'assets/images/hero-image.svg';
import cube from 'assets/images/cube.svg';
import discord from 'assets/images/discord-yellow.svg';
import discordButtonIcon from 'assets/images/discord-button-icon.svg';
import githubButtonIcon from 'assets//images/github-button-icon.svg';
import halfSphere from 'assets/images/half-sphere.svg';
import halo from 'assets/images/halo.svg';
import sphere from 'assets/images/sphere.svg';
import Button from 'components/Button';

const BULLET_POINTS = [
  {
    alt: 'Sphere',
    content:
      'Deploy a network of radio antennas that connect through these advanced SIM cards, all registered on the Ethereum blockchain. This setup ensures not just widespread internet access, but also a new level of security and reliability in digital connectivity.',
    heading: 'Blockchain-Powered Connectivity',
    image: sphere,
  },
  {
    alt: 'Cube',
    content:
      'Our SIM cards come with embedded hardware wallets, enabling secure Ethereum transactions. Utilizing the Sepolia testnet, we offer a reliable and secure platform for digital transactions, even in areas with limited financial infrastructure.',
    heading: 'Integrated Hardware Wallets',
    image: cube,
  },
  {
    alt: 'Half Sphere',
    content:
      'Prioritizes inclusivity and ease of access. With a potential tiered internet access system and a universally accessible user interface, we aim to provide essential connectivity services to all, regardless of their location or technical capability. ',
    heading: 'Universal Access and Control',
    image: halfSphere,
  },
];

const FAQS = [
  {
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lectus est, pretium sit amet condimentum eu, egestas eget tellus. Nulla facilisi. Aliquam euismod mauris non dui sagittis viverra. Nunc feugiat pellentesque viverra. Vestibulum sollicitudin pulvinar tempus. Etiam id viverra velit. Vivamus vel pharetra neque, et accumsan massa. Phasellus eu molestie ligula. Vestibulum velit est, vestibulum vitae egestas a, ullamcorper rutrum est. Vestibulum laoreet suscipit ex, nec finibus risus sollicitudin et. Aenean varius erat quis nibh fermentum aliquet. Phasellus ultrices, nisl eget porttitor malesuada, enim lorem commodo massa, at vehicula nisl eros sit amet augue. Sed sagittis tincidunt magna, et fermentum ante consectetur quis. Etiam a elit urna. Nulla tincidunt vehicula laoreet. Quisque finibus eleifend sem, ut dictum lorem feugiat at.',
    question: 'Do I get any incentive to run a hot spot?',
  },
  {
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lectus est, pretium sit amet condimentum eu, egestas eget tellus. Nulla facilisi. Aliquam euismod mauris non dui sagittis viverra. Nunc feugiat pellentesque viverra. Vestibulum sollicitudin pulvinar tempus. Etiam id viverra velit. Vivamus vel pharetra neque, et accumsan massa. Phasellus eu molestie ligula. Vestibulum velit est, vestibulum vitae egestas a, ullamcorper rutrum est. Vestibulum laoreet suscipit ex, nec finibus risus sollicitudin et. Aenean varius erat quis nibh fermentum aliquet. Phasellus ultrices, nisl eget porttitor malesuada, enim lorem commodo massa, at vehicula nisl eros sit amet augue. Sed sagittis tincidunt magna, et fermentum ante consectetur quis. Etiam a elit urna. Nulla tincidunt vehicula laoreet. Quisque finibus eleifend sem, ut dictum lorem feugiat at.',
    question: 'Do I get any incentive to run a hot spot?',
  },
  {
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lectus est, pretium sit amet condimentum eu, egestas eget tellus. Nulla facilisi. Aliquam euismod mauris non dui sagittis viverra. Nunc feugiat pellentesque viverra. Vestibulum sollicitudin pulvinar tempus. Etiam id viverra velit. Vivamus vel pharetra neque, et accumsan massa. Phasellus eu molestie ligula. Vestibulum velit est, vestibulum vitae egestas a, ullamcorper rutrum est. Vestibulum laoreet suscipit ex, nec finibus risus sollicitudin et. Aenean varius erat quis nibh fermentum aliquet. Phasellus ultrices, nisl eget porttitor malesuada, enim lorem commodo massa, at vehicula nisl eros sit amet augue. Sed sagittis tincidunt magna, et fermentum ante consectetur quis. Etiam a elit urna. Nulla tincidunt vehicula laoreet. Quisque finibus eleifend sem, ut dictum lorem feugiat at.',
    question: 'Do I get any incentive to run a hot spot?',
  },
  {
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lectus est, pretium sit amet condimentum eu, egestas eget tellus. Nulla facilisi. Aliquam euismod mauris non dui sagittis viverra. Nunc feugiat pellentesque viverra. Vestibulum sollicitudin pulvinar tempus. Etiam id viverra velit. Vivamus vel pharetra neque, et accumsan massa. Phasellus eu molestie ligula. Vestibulum velit est, vestibulum vitae egestas a, ullamcorper rutrum est. Vestibulum laoreet suscipit ex, nec finibus risus sollicitudin et. Aenean varius erat quis nibh fermentum aliquet. Phasellus ultrices, nisl eget porttitor malesuada, enim lorem commodo massa, at vehicula nisl eros sit amet augue. Sed sagittis tincidunt magna, et fermentum ante consectetur quis. Etiam a elit urna. Nulla tincidunt vehicula laoreet. Quisque finibus eleifend sem, ut dictum lorem feugiat at.',
    question: 'Do I get any incentive to run a hot spot?',
  },
];

function App() {
  return (
    <div>
      <Header />
      <div className='relative my-40 px-4'>
        <div className='max-w-[906px]'>
          <div className='break-words text-cinder-50 text-sn-h1-sm md:text-sn-h1-lg'>
            UNIVERSAL BASIC INTERNET
          </div>
          <div className='max-w-[605px] text-cinder-50 text-sn-lg'>
            Semaphore Network is revolutionizing global connectivity as a public
            good. Harnessing blockchain's power, we're redefining internet
            access and introducing secure Ethereum transactions to all.
          </div>
          <div className='flex gap-6 max-w-[515px] mt-6'>
            <Button
              className='border-none'
              image={discordButtonIcon}
              onClick={() => window.open('https://discord.com', '_blank')}
              text='Join the conversation'
            />
            <Button
              className='bg-cinder-950'
              image={githubButtonIcon}
              onClick={() =>
                window.open('https://github.com/SemaphoreNetwork', '_blank')
              }
              variant='outline'
              text='Our repo'
            />
          </div>
        </div>
        <img
          alt='Hero'
          className='absolute blur-lg opacity-75 right-0 top-[-50%] z-[-1]'
          src={heroImage}
        />
      </div>
      <div className='max-w-[687px] mx-auto px-4 text-center text-cinder-50 text-sn-lg'>
        Our mission is to transform internet access into a universally
        accessible public good. Here's how we're making this happen:
      </div>
      <div className='flex flex-wrap gap-10 md:gap-28 items-center justify-center md:mb-60 my-10 md:my-16 px-4'>
        {BULLET_POINTS.map(({ alt, content, heading, image }) => (
          <div className='max-w-[408px] text-center'>
            <img alt={alt} className='mx-auto my-10' src={image} />
            <div className='mt-4 text-cinder-50 text-sn-h4-sm md:text-sn-h4-lg'>
              {heading}
            </div>
            <div className='mt-4 text-cinder-300 text-sn-base '>{content}</div>
          </div>
        ))}
      </div>
      <div className='bg-sn-yellow-400 md:h-[435px] px-4 py-4 md:py-0'>
        <div className='flex flex-col md:flex-row h-full items-center justify-center max-w-[1440px] mx-auto'>
          <div className='max-w-[656px]'>
            <div className='text-sn-h3-sm md:text-sn-h3-lg'>
              Host The Network
            </div>
            <div className='py-4'>
              Deploy FOSS Infrastructure In Your Local Community, Or The Wild!
              Get Rewarded By The DAO
            </div>
            <Button className='w-full' text='Learn more' />
          </div>
          <div className='bg-cinder-950 h-px md:h-full my-16 md:mx-16 w-full md:w-px' />
          <div className='max-w-[656px]'>
            <div className='text-sn-h3-sm md:text-sn-h3-lg'>
              Use The Network
            </div>
            <div className='py-4'>
              Use Our Network's Cellular And WiFi Service On Almost Any Phone Or
              Laptop; Anywhere The DAO Is.
            </div>
            <Button className='w-full' text='Learn more' />
          </div>
        </div>
      </div>
      <div className='max-w-[859px] mx-auto my-[120px] w-full px-4'>
        <div className='text-center text-cinder-50 text-sn-h4-sm md:text-sn-h4-lg'>
          FAQ
        </div>
        <div className='mt-10'>
          {FAQS.map(({ answer, question }) => (
            <div className='border-b border-cinder-600 py-4'>
              <div className='text-cinder-200 text-sn-base-1'>{question}</div>
              <div className='mt-1 text-cinder-300'>{answer}</div>
            </div>
          ))}
        </div>
      </div>
      <div className='flex justify-center px-4'>
        <div>
          <div className='flex flex-wrap gap-12 justify-center'>
            <div className='text-center md:text-left'>
              <div className='text-sn-h3-sm md:text-sn-h3-lg text-sn-yellow-400'>
                Join the conversation
              </div>
              <div className='text-cinder-50 text-sn-lg'>
                Got more questions? Have an idea?
              </div>
            </div>
            <a href='https://discord.com' rel='noreferrer' target='_blank'>
              <img alt='Discord' src={discord} />
            </a>
          </div>
          <img alt='Halo' className='mx-auto' src={halo} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
