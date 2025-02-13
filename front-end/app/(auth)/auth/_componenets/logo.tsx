import React from 'react'
import Image from "next/image"
import Link from 'next/link'
function logo() {
  return (
    <div>
       <Link href="/">
          <Image 
                height={100}
                width={100}
                alt="logo"
                src="/backgroundlessAi.png"
            />
        </Link>

    </div>
  )
}

export default logo




