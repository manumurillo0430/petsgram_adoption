
import { useState } from "react";
import { 
  Flex, Text, useColorMode,
  RangeSlider, RangeSliderTrack, RangeSliderMark, RangeSliderFilledTrack, RangeSliderThumb, Tag, TagLabel, TagCloseButton 
} from "@chakra-ui/react";
import { Divider } from 'antd';
export default function FilterSlider({filter, min, max, onSliderChange, mr}) {
  
  const [sliderMark, setSliderMark] = useState([min, max]);
  const [showTag, setShowTag] = useState(true)
  const [showSliderMark, setShowSliderMark] = useState(false);

  
  return (
    <Flex wrap="nowrap" flexDirection="column" mr={mr}>
      <Flex>
      <Text fontSize="md" fontWeight="semibold" mr={4} casing="capitalize">{filter}</Text>
      <RangeSlider
        mr={5}
        aria-label={["min", "max"]}
        colorScheme="blue"
        defaultValue={[0, 100]}
        w="10rem"
        onChange={val => {setSliderMark(val); setShowSliderMark(false); onSliderChange(val); setShowTag(false)}}
        onChangeEnd={val => {
          setShowSliderMark([0, 0]); 
          setShowSliderMark(false);
    
        }}
      >
      {showSliderMark
        ? <>
            <RangeSliderMark
              value={sliderMark[0]}
              textAlign="center"
              mt="-6"
              ml="-5"
              minW="max-content"
              fontSize="md"
            >
              {`${sliderMark[0]} cm`}
            </RangeSliderMark>
            <RangeSliderMark
              value={sliderMark[1]}
              textAlign="center"
              mt="6"
              ml="-5"
              minW="max-content"
              fontSize="md"
            >
              {`${sliderMark[1]} cm`}
            </RangeSliderMark>
          </>
        : null}
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} />
        <RangeSliderThumb index={1} />
      </RangeSlider>
      </Flex>
      <Divider style={{border:"none", margin:"0.5rem"}}/>
      <Flex display={showTag ? "none" :""} justifyContent="center" alignContent="center">
        <Tag   flexDirection="row" wrap="row nowrap" size="md" key={filter} variant='outline' colorScheme='blue'>
          <TagLabel>{filter === "height" ? `${min}-${max} cm` : `${min}-${max} kg`} </TagLabel>
          
        </Tag>
    </Flex>
  </Flex>
  )
}