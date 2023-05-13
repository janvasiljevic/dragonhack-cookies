package main

import (
	"bufio"
	"errors"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"strings"
)

func main() {
	host, err := readHostFromEnvFile("./env/.env.local")
	if err != nil {
		fmt.Printf("Error reading .env file: %v\n", err)
		os.Exit(1)
	}

	schema, err := fetchOpenAPISchema(host)
	if err != nil {
		fmt.Printf("Error fetching OpenAPI schema: %v\n", err)
		os.Exit(1)
	}

	err = ioutil.WriteFile("spec/api.json", []byte(schema), 0644)
	if err != nil {
		fmt.Printf("Error writing schema.json file: %v\n", err)
		os.Exit(1)
	}

	fmt.Println("Successfully downloaded OpenAPI schema to schema.json")
}

func readHostFromEnvFile(filePath string) (string, error) {
	file, err := os.Open(filePath)

	if err != nil {
		return "", err
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)

	for scanner.Scan() {
		line := scanner.Text()
		if strings.HasPrefix(line, "VITE_BACKEND_API=") {

			url := strings.TrimPrefix(line, "VITE_BACKEND_API=")

			// trim whitespace if present
			url = strings.TrimSpace(url)

			// trim quotes if present
			url = strings.Trim(url, "\"")

			return url, nil
		}
	}

	if err := scanner.Err(); err != nil {
		return "", err
	}

	return "", errors.New("HOST not found in .env file")
}

func fetchOpenAPISchema(host string) (string, error) {

	fmt.Printf("Fetching OpenAPI schema from %s\n", host)

	resp, err := http.Get(fmt.Sprintf("%s/api-json", host))
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return "", fmt.Errorf("unexpected status code: %d", resp.StatusCode)
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}

	return string(body), nil
}
