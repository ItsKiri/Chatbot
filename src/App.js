import './App.css';
import { useState } from "react";
import {
    Button,
    Container,
    Form,
    FormField,
    Header,
    Input,
    SpaceBetween,
    TextContent
} from "@cloudscape-design/components";

function App() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [flag, setFlag] = useState(false);

    const handleSubmit = () => {
        setFlag(true);
        setAnswer("");
        const queryParams = new URLSearchParams({ question: question });

        fetch(`server_endpoint/?${queryParams.toString()}`, {
            method: 'POST'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setAnswer(data.text || "Sorry, no response from server.");
            })
            .catch(error => console.error('There was an error!', error))
            .finally(() => {
                setFlag(false);
            })
    };

    return (
        <div className="App">
            <form onSubmit={e => {
                e.preventDefault();
                handleSubmit();
            }}>
                <Form
                    actions={
                        <Button variant="primary" onClick={handleSubmit} disabled={flag}>Submit</Button>
                    }
                >
                    <Container
                        header={
                            <Header variant="h2">
                                Chatbot
                            </Header>
                        }
                    >
                        <SpaceBetween direction="vertical" size="l">
                            <FormField label="Question">
                                <Input onChange={({ detail }) => setQuestion(detail.value)} value={question} disabled={flag}/>
                            </FormField>
                        </SpaceBetween>
                    </Container>
                </Form>
            </form>
            {answer && <TextContent>
                <p>
                    {answer}
                </p>
            </TextContent>}
        </div>
    );
}

export default App;
