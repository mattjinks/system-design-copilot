package main

import (
	"bytes"
	"context"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"

	"github.com/Azure/azure-sdk-for-go/sdk/ai/azopenai"
	"github.com/Azure/azure-sdk-for-go/sdk/azcore"
	"github.com/Azure/azure-sdk-for-go/sdk/azcore/to"
	"github.com/gin-gonic/gin"
)

type Position struct {
	X float64 `json:"x"`
	Y float64 `json:"y"`
}

type Measured struct {
	Width  int `json:"width"`
	Height int `json:"height"`
}

type Data struct {
	Color       string `json:"color"`
	Label       string `json:"label"`
	LeftHandle  string `json:"leftHandle"`
	RightHandle string `json:"rightHandle"`
	Notes       string `json:"notes"`
	Shape       string `json:"shape"`
}

type Diagram struct {
	Nodes []Node `json:"nodes"`
	Edges []Edge `json:"edges"`
}

type Node struct {
	Id       string   `json:"id"`
	Data     Data     `json:"data"`
	Measured Measured `json:"measured"`
	Position Position `json:"position"`
	Type     string   `json:"type"`
}

// Go back and fix id type
type Edge struct {
	Id     string `json:"id"`
	Source string `json:"source"`
	Target string `json:"target"`
	Type   string `json:"type"`
}

type DatabaseSchema struct {
	Models []Model `json:"models"` // Fix JSON tag
}

type Model struct {
	Id    int         `json:"id"`
	Name  string      `json:"name"`
	Data  []ModelData `json:"data"` //fix this
	Notes string      `json:"notes"`
}

type ModelData struct {
	Id   int    `json:"id"`
	Text string `json:"text"`
}

type SystemAPIs struct {
	Endpoints []Endpoint `json:"endpoints"` // Fix JSON tag
}

// fix this
type Endpoint struct {
	Id      int      `json:"id"`
	Name    string   `json:"name"`
	Params  []Param  `json:"params"`
	Returns []Return `json:"returns"`
	Notes   string   `json:"notes"`
}

type Param struct {
	Id   int    `json:"id"`
	Text string `json:"text"`
}

type Return struct {
	Id   int    `json:"id"`
	Text string `json:"text"`
}

type ScaleEstimates struct {
	Capacity  string `json:"capacity"`
	Storage   string `json:"storage"`
	Bandwidth string `json:"bandwidth"`
}

type Requirement struct {
	Id   int    `json:"id"`
	Text string `json:"text"`
}

type Requirements struct {
	Functional    []Requirement `json:"functional"`
	NonFunctional []Requirement `json:"nonFunctional"`
	Notes         string        `json:"notes"`
}

type DescriptionRequest struct {
	Description  string       `json:"description"`
	Requirements Requirements `json:"requirements"`
}

type RequirementsRequest struct {
	Description string `json:"description"`
}

type ScaleRequest struct {
	Description string `json:"description"`
}

type APIsRequest struct {
	Description string `json:"description"`
}

type DBSchemaRequest struct {
}

type DiagramRequest struct {
}

type OverallSystemRequest struct {
	Description         string         `json:"description"`
	Requirements        Requirements   `json:"requirements"`
	ScaleEstimates      ScaleEstimates `json:"scaleEstimates"`
	SystemAPIs          SystemAPIs     `json:"systemAPIs"`
	DatabaseSchema      DatabaseSchema `json:"dbSchema"`
	Diagram             Diagram        `json:"diagram"`
	UserMessage         string         `json:"userMessage"`
	ExtraConsiderations string         `json:"extraConsiderations"`
}

// type UserMessage struct {
// 	UserMessage string `json:"userMessage"`
// }

var conversations = make(map[string][]azopenai.ChatRequestMessageClassification)

func main() {

	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	router := gin.Default()
	// router.GET("/chat-stream", streamChat) // Setup an HTTP GET endpoint
	router.POST("/chat-stream", streamChat) // Setup an HTTP GET endpoint

	// Enable CORS for React app
	router.Use(corsMiddleware())

	router.Run("0.0.0.0:8080") // Run the Gin server on port 8080

	// fmt.Fprintf("listening on port 8080\n")
}

// CORS middleware to allow cross-origin requests
func corsMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Allow specific origin (your React app)
		// c.Writer.Header().Set("Access-Control-Allow-Origin", "https://main.d2oq7odcbvfay0.amplifyapp.com")
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, sessionId, chatKey")
		c.Writer.Header().Set("Access-Control-Expose-Headers", "Content-Type")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		// Continue to the next middleware or handler
		c.Next()
	}
}

// HTTP handler to stream chat completions
func streamChat(c *gin.Context) {

	// var req DescriptionRequest
	// var system OverallSystemRequest

	// if err := c.ShouldBindJSON(&system); err != nil {
	// 	log.Printf("ERROR: %s", err)
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
	// 	return
	// }

	sessionId := c.Query("sessionId")
	if sessionId == "" {
		log.Printf("Session Id is missing")
		c.JSON(http.StatusBadRequest, gin.H{"error": "Session Id is required"})
		return
	}

	chatKey := c.Query("chatKey")
	if chatKey == "" {
		log.Printf("chatKey is missing")
		c.JSON(http.StatusBadRequest, gin.H{"error": "Chat Key is required"})
		return
	}

	log.Printf("SessionId: %s", sessionId)
	log.Printf("chatKey: %s", chatKey)

	var system OverallSystemRequest
	bodyBytes, err := io.ReadAll(c.Request.Body)
	if err != nil {
		log.Printf("Error reading request body: %s", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	log.Printf("Received payload: %s", string(bodyBytes)) // Logs raw JSON request body

	// Re-create the request body from the bytes for binding
	c.Request.Body = io.NopCloser(bytes.NewBuffer(bodyBytes))

	if err := c.ShouldBindJSON(&system); err != nil {
		log.Printf("ERROR: %s", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	// var system OverallSystemRequest
	// bodyBytes, _ := io.ReadAll(c.Request.Body)
	// log.Printf("Received payload: %s", string(bodyBytes)) // Logs raw JSON request body

	// if err := c.ShouldBindJSON(&system); err != nil {
	// 		log.Printf("ERROR: %s", err)
	// 		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
	// 		return
	// }

	// log.Printf("%+v", system.Description)

	// // log.Printf("%+v", req.Requirements)
	// log.Printf("%+v", system.Requirements.Functional)
	// log.Printf("%+v", system.Requirements.NonFunctional)
	// log.Printf("%+v", system.Requirements.Notes)

	// // log.Printf("%+v", req.ScaleEstimates)
	// log.Printf("%+v", system.ScaleEstimates.Capacity)
	// log.Printf("%+v", system.ScaleEstimates.Storage)
	// log.Printf("%+v", system.ScaleEstimates.Bandwidth)

	// // log.Printf("%+v", system.SystemAPIs)
	// log.Printf("%+v", system.SystemAPIs.Endpoints)

	// log.Printf("%+v", system.DatabaseSchema.Models)

	// log.Printf("%+v", system.Diagram)

	azureOpenAIKey := os.Getenv("AZURE_OPENAI_API_KEY")
	modelDeploymentID := os.Getenv("AZURE_OPENAI_CHAT_DEPLOYMENT")
	azureOpenAIEndpoint := os.Getenv("AZURE_OPENAI_ENDPOINT")
	maxTokens := int32(1024)

	if azureOpenAIKey == "" || modelDeploymentID == "" || azureOpenAIEndpoint == "" {
		c.String(http.StatusInternalServerError, "Environment variables missing")
		fmt.Fprintf(os.Stderr, "Skipping example, environment variables missing\n")
		return
	}

	keyCredential := azcore.NewKeyCredential(azureOpenAIKey)
	client, err := azopenai.NewClientWithKeyCredential(azureOpenAIEndpoint, keyCredential, nil)
	if err != nil {
		log.Printf("ERROR: %s", err)
		c.String(http.StatusInternalServerError, "Failed to create OpenAI client")
		return
	}

	conversation, exists := conversations[sessionId+chatKey]
	if !exists {
		log.Printf("Session ID doesn't exist")
		systemMessage := &azopenai.ChatRequestSystemMessage{
			Content: to.Ptr("You are a system design assistant for software engineers."),
		}

		var userMessage *azopenai.ChatRequestUserMessage
		switch chatKey {
		case "description":
			log.Printf("Description Prompt")
			userMessage = &azopenai.ChatRequestUserMessage{
				Content: azopenai.NewChatRequestUserMessageContent(
					fmt.Sprintf(`Here is a description of the system I plan to design: '%s'. Could you assess whether this description is clear in 2-3 sentences? Your response should start with "Your description of"`, system.Description),
				),
			}
		case "requirements":
			log.Printf("Requirements Prompt")
			userMessage = &azopenai.ChatRequestUserMessage{
				Content: azopenai.NewChatRequestUserMessageContent(
					fmt.Sprintf("Please evaluate if these system requirements: '%v' align well with the system's overall description: '%s'.", system.Requirements, system.Description),
				),
			}
		case "scaleEstimates":
			log.Printf("scaleEstimates Prompt")
			userMessage = &azopenai.ChatRequestUserMessage{
				Content: azopenai.NewChatRequestUserMessageContent(
					fmt.Sprintf("Based on the system description '%s' and requirements '%v', do these scale estimates: '%v' seem appropriate?", system.Description, system.Requirements, system.ScaleEstimates),
				),
			}
		case "apis":
			log.Printf("APIs Prompt")
			userMessage = &azopenai.ChatRequestUserMessage{
				Content: azopenai.NewChatRequestUserMessageContent(
					fmt.Sprintf("Evaluate these API endpoints: '%v' and let me know if they align with the system description '%s', requirements '%v', and scale estimates '%v'.", system.SystemAPIs, system.Description, system.Requirements, system.ScaleEstimates),
				),
			}
		case "dbSchema":
			log.Printf("db schema Prompt")
			userMessage = &azopenai.ChatRequestUserMessage{
				Content: azopenai.NewChatRequestUserMessageContent(
					fmt.Sprintf("Evaluate these API endpoints: '%v' and let me know if they align with the system description '%s', requirements '%v', and scale estimates '%v'.", system.SystemAPIs, system.Description, system.Requirements, system.ScaleEstimates),
				),
			}
		case "diagram":
			log.Printf("diagram Prompt")
			userMessage = &azopenai.ChatRequestUserMessage{
				Content: azopenai.NewChatRequestUserMessageContent(
					fmt.Sprintf("Assess this system flow diagram: '%v' and let me know if it aligns with the system description '%s', requirements '%v', scale estimates '%v', API endpoints '%v', and database schema '%v'.", system.Diagram, system.Description, system.Requirements, system.ScaleEstimates, system.SystemAPIs, system.DatabaseSchema),
				),
			}
		case "extra":
			log.Printf("extra Prompt")
			userMessage = &azopenai.ChatRequestUserMessage{
				Content: azopenai.NewChatRequestUserMessageContent(
					fmt.Sprintf("Please evaluate these additional considerations/notes: '%v' to see if they align with the system description '%s', requirements '%v', scale estimates '%v', API endpoints '%v', database schema '%v', and flow diagram '%v'.", system.ExtraConsiderations, system.Description, system.Requirements, system.ScaleEstimates, system.SystemAPIs, system.DatabaseSchema, system.Diagram),
				),
			}
		default:
			log.Printf("Invalid chatKey: %s", chatKey)
			return
		}

		conversation = []azopenai.ChatRequestMessageClassification{
			systemMessage,
			userMessage,
			// &azopenai.ChatRequestSystemMessage{
			//   Content: to.Ptr("You are a therapist giving me advice about handling breakup."),
			// },
			// &azopenai.ChatRequestUserMessage{
			// 	Content: azopenai.NewChatRequestUserMessageContent("I miss my ex."),
			// },
		}

		conversations[sessionId+chatKey] = conversation

	} else {
		// Log the session conversation properly by iterating over the slice
		if exists {
			log.Printf("Length of conversation: %v", len(conversation))
			conversations[sessionId+chatKey] = append(conversations[sessionId+chatKey], &azopenai.ChatRequestUserMessage{
				Content: azopenai.NewChatRequestUserMessageContent(system.UserMessage),
			})
			// log.Printf("Conversation length: %d", len(conversations[sessionId+chatKey]))
			log.Printf("Session %s conversation:", sessionId+chatKey)
			// for _, msg := range conversation {
			// 		// Depending on the type of message, cast and print the content
			// 		switch v := msg.(type) {
			// 		case *azopenai.ChatRequestSystemMessage:
			// 				log.Printf("System Message: %s", *v.Content)
			// 		case *azopenai.ChatRequestUserMessage:
			// 				log.Printf("User Message: %s", *v.Content)
			// 		case *azopenai.ChatRequestAssistantMessage:
			// 				log.Printf("Model Message: %s", *v.Content)
			// 		default:
			// 				log.Printf("Unknown message type")
			// 		}
			// }
		}
		//log.Printf("Session %s conversation: %v", sessionId, conversations[sessionId])
	}

	for _, msg := range conversations[sessionId+chatKey] {
		// Depending on the type of message, cast and print the content
		switch v := msg.(type) {
		case *azopenai.ChatRequestSystemMessage:
			log.Printf("System Message: %s", *v.Content)
		case *azopenai.ChatRequestUserMessage:
			log.Printf("User Message: %s", *v.Content)
		case *azopenai.ChatRequestAssistantMessage:
			log.Printf("Model Message: %s", *v.Content)
		default:
			log.Printf("Unknown message type")
		}
	}

	gotReply := false

	// Send the request to OpenAI
	resp, err := client.GetChatCompletionsStream(context.TODO(), azopenai.ChatCompletionsOptions{
		Messages:       conversations[sessionId+chatKey],
		N:              to.Ptr[int32](1),
		DeploymentName: &modelDeploymentID,
		MaxTokens:      &maxTokens,
	}, nil)
	defer resp.ChatCompletionsStream.Close()

	if err != nil {
		log.Printf("ERROR: %s", err)
		c.String(http.StatusInternalServerError, "Failed to get chat completions stream")
		return
	}

	// Set response headers for Server-Sent Events (SSE)
	c.Header("Content-Type", "text/event-stream")
	c.Header("Cache-Control", "no-cache")
	c.Header("Connection", "keep-alive")
	c.Header("Access-Control-Allow-Origin", "*") // Allow specific origin
	// c.Header("Access-Control-Allow-Origin", "https://main.d2oq7odcbvfay0.amplifyapp.com") // Allow specific origin

	// Stream the completions as they are generated

	fullText := ""
	for {
		chatCompletions, err := resp.ChatCompletionsStream.Read()

		if errors.Is(err, io.EOF) {
			break
		}

		if err != nil {
			log.Printf("ERROR: %s", err)
			c.String(http.StatusInternalServerError, "Error reading chat completions")
			return
		}

		for _, choice := range chatCompletions.Choices {
			gotReply = true

			text := ""
			if choice.Delta.Content != nil {
				text = *choice.Delta.Content
			}

			fullText = fullText + text

			// if len(text) > 0 && strings.HasSuffix(text, " ") {
			// 	trimmed := strings.TrimSpace(text)
			// 	if strings.HasSuffix(trimmed, "!") || strings.HasSuffix(trimmed, "?") || strings.HasSuffix(trimmed, ".") {
			// 			text = trimmed // Remove trailing space if there's punctuation
			// 	}
			// }

			//role := ""

			// if choice.Delta.Role != nil {
			// 	role = string(*choice.Delta.Role)
			// }

			// fmt.Fprintf(os.Stderr, "Content[%d], role %q: %q\n", *choice.Index, role, text)

			// Write the chat response as a server-sent event
			fmt.Fprintf(c.Writer, "%s", text)
			c.Writer.Flush() // Ensure data is sent immediately

		}
	}

	conversations[sessionId+chatKey] = append(conversations[sessionId+chatKey], &azopenai.ChatRequestAssistantMessage{
		Content: to.Ptr(fullText),
	})

	// c.JSON(http.StatusOK, gin.H{
	// 	"message": "pong",
	// })

	if gotReply {
		fmt.Fprintf(os.Stderr, "Got chat completions streaming reply\n")
	}
}
