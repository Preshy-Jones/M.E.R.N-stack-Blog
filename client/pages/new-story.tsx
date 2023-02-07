import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import Layout from '../components/layouts'
import { Formik, Form } from 'formik'
import { AutoResizeTextarea } from '../components/ui/TextAreaField'

const NewStory = () => {
  //create ref with type HTMLTextAreaElement
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null)
  const textAreaRef2 = React.useRef<HTMLTextAreaElement>(null)

  const initialValues = {
    title: '',
    content: '',
  }
  return (
    <Layout>
      <Flex justify="center">
        <Flex width="60%">
          <Box width="100%">
            // @ts-ignore
            <Formik initialValues={initialValues} onSubmit={() => {}}>
              {({ handleChange, values }) => (
                <Form>
                  <pre>{JSON.stringify(values, null, 2)}</pre>
                  <Flex alignItems="center">
                    <AiOutlinePlusCircle size={30} />
                    <AutoResizeTextarea
                      ref={textAreaRef}
                      border="none"
                      focusBorderColor="none"
                      placeholder="Title"
                      name="title"
                      onChange={handleChange}
                    />
                  </Flex>
                  {values.title && (
                    <Flex alignItems="center">
                      <AiOutlinePlusCircle size={30} />
                      <AutoResizeTextarea
                        ref={textAreaRef2}
                        border="none"
                        focusBorderColor="none"
                        placeholder="Tell us your story..."
                        name="content"
                        onChange={handleChange}
                      />
                    </Flex>
                  )}
                </Form>
              )}
            </Formik>
          </Box>
        </Flex>
      </Flex>
    </Layout>
  )
}

export default NewStory