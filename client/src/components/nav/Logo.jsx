import React from 'react'
import NextLink from 'next/link'
import { Link, Image } from '@chakra-ui/react'

export default function Logo({ src, alt, ml }) {
    return (
        <Link mr={ml} w="10%" as={NextLink} href="/">
            <Image src={src} alt={alt} />
        </Link>
    )
}
