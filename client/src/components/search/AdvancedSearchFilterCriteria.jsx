import { useEffect, useState } from 'react'
import { Center, Button, Flex, FormLabel } from '@chakra-ui/react'
import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons'
import { petStatus } from '../../utils/globals'
import { useSearchContext } from '../../context/SearchContext'
import FormNumberField from '../form/FormNumberField'
import * as yup from 'yup'
import { Formik } from 'formik'
import FormSubmitButtom from '../form/FormSubmitButtom'
import { Input } from '@chakra-ui/react'
import FilterSlider from './FilterSlider'

export default function AdvancedSearchFilterCriteria() {
    const { getFilteredPetsByCriteria, setFilterSelection, filterSelection } = useSearchContext()

    const [minHeight, setMinHeight] = useState(0)
    const [maxHeight, setMaxHeight] = useState(100)

    const [minWeight, setMinWeight] = useState(0)
    const [maxWeight, setMaxWeight] = useState(100)

    const [petName, setPetName] = useState()

    const handleSliderChangeHeight = (values) => {
        setMinHeight(values[0])
        setMaxHeight(values[1])
    }

    const handleSliderChangeWeight = (values) => {
        setMinWeight(values[0])
        setMaxWeight(values[1])
    }

    useEffect(() => {
        setFilterSelection({
            ...filterSelection,
            minHeight: minHeight,
            maxHeight: maxHeight,
            minWeight: minWeight,
            maxWeight: maxWeight,
            name: petName,
        })
        // yofi manu
    }, [petName])

    const weightHeightShema = yup.object().shape({
        type: yup.string(),
        name: yup.string(),
        adoptionStatus: yup.string(),
        minHeight: yup.number(),
        maxHeight: yup.number(),
        minWeight: yup.number(),
        maxWeight: yup.number(),
    })

    return (
        <Formik
            initialValues={{
                name: '',
                adoptionStatus: '',
                minHeight: '',
                maxHeight: '',
                minWeight: '',
                maxWeight: '',
            }}
            validationSchema={weightHeightShema}
            onSubmit={async (values, { resetForm }) => {
                try {
                    if (
                        filterSelection.adoptionStatus === 'Adoption Status' ||
                        filterSelection.adoptionStatus === 'Any'
                    ) {
                        filterSelection.adoptionStatus = ''
                    }
                    if (filterSelection.type === 'Type' || filterSelection.type === 'Any') {
                        filterSelection.type = ''
                    }

                    setFilterSelection({
                        type: filterSelection.type,
                        name: petName,
                        adoptionStatus: filterSelection.adoptionStatus,
                        minHeight: minHeight,
                        maxHeight: maxHeight,
                        minWeight: minWeight,
                        maxWeight: maxWeight,
                    })
                    console.log(filterSelection)
                    await getFilteredPetsByCriteria(filterSelection)
                } catch (error) {}
            }}
        >
            {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <Center>
                        <Flex mt={2} w="100%" alignContent="center" placeItems="center" flexDirection="column">
                            <Input
                                name="name"
                                type="text"
                                placeholder="Search for a pet by name..."
                                px={6}
                                onChange={(e) => setPetName(e.target.value)}
                                onKeyDown={(e) => (e.key === 'Enter' ? handleSubmit() : null)}
                            />
                            <Flex my={4} alignContent="center" flexDirection="row">
                                <FilterSlider
                                    min={minHeight}
                                    max={maxHeight}
                                    onSliderChange={handleSliderChangeHeight}
                                    filter="height"
                                />
                                <FilterSlider
                                    min={minWeight}
                                    max={maxWeight}
                                    onSliderChange={handleSliderChangeWeight}
                                    filter="weight"
                                />
                            </Flex>
                            <Button w="50%" aria-label="Search" colorScheme="blue" onClick={handleSubmit}>
                                Search
                            </Button>
                        </Flex>
                    </Center>
                </form>
            )}
        </Formik>
    )
}
