import discord from 'assets/images/discord.svg';
import github from 'assets/images/github.svg';
import logo from 'assets/images/logo.svg';

export default function Footer(): JSX.Element {
  return (
    <div className='border-t-2 border-sn-yellow-400 flex gap-6 h-60 items-center justify-between px-4 md:px-16'>
      <div>
        <img alt='Logo' src={logo} />
        <div className='mt-2 text-white text-sn-md'>
          A public good, open source project supported by Ethereum Foundation.
        </div>
      </div>
      <div className='flex gap-4 shrink-0'>
        <a href='https://discord.com' rel='noreferrer' target='_blank'>
          <img alt='Discord' src={discord} />
        </a>
        <a
          href='https://github.com/SemaphoreNetwork'
          rel='noreferrer'
          target='_blank'
        >
          <img alt='Github' src={github} />
        </a>
      </div>
    </div>
  );
}
