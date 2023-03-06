import React from 'react'
import { useEffect } from 'react'
import { Text, Container, Flex, Image } from '@chakra-ui/react'

import { GetReq, PostReq } from '../utils/api'
import { useAuthContext } from '../context/AuthContext'
import axios from 'axios'

export default function Home() {
    const { currentUser } = useAuthContext()
    console.log(currentUser)
    // useEffect(() => {
    //     const awaitGetPets = async () => await getAllPets()
    //     awaitGetPets()
    // }, [])

    // const getAllPets = async () => {
    //     try {
    //         const res = await GetReq('/pet')
    //         console.log(res)
    //         if (res) {
    //             res.map(async (pet) => {
    //                 try {
    //                     await PostReq('/pet', pet)
    //                 } catch (error) {
    //                     console.error(error)
    //                 }
    //             })
    //         }
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }

    return (
        <Container w="100%" h="100vh" bgPosition="left" bgRepeat="no-repeat" bgSize="contain" flexDirection="row">
            <Flex>
                <Container>
                    <Text w="50%">
                        Welcome to our pet adoption platform, where you can find the perfect furry friend for your
                        family. Our mission is to connect loving families with abandoned or rescued pets in need of a
                        forever home. Our platform showcases a wide range of adorable pets, from dogs and cats to
                        rabbits and birds, all waiting for their chance to find a loving family. We understand that
                        choosing the right pet can be a challenging and emotional decision. That's why our team is here
                        to guide you every step of the way, from helping you find the pet that matches your lifestyle
                        and family, to providing you with all the information and resources you need to ensure a smooth
                        and successful adoption process. Whether you're a first-time pet owner or an experienced pet
                        parent, we are here to make your pet adoption experience an enjoyable one. Browse our collection
                        of furry friends and find the pet that steals your heart today!
                    </Text>
                </Container>
                <Container w="50%">
                    <Image
                        src="https://res.cloudinary.com/dugudxkyu/image/upload/v1661973596/k58mqitmmtw1racqwxrj.png"
                        alt="Dan Abramov"
                    />
                </Container>
            </Flex>
        </Container>
    )
}
