package cmd

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"sort"
	"strings"

	"gopkg.in/yaml.v2"
)

const LinguistUrl = "https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml"
const JsonFilePath = "./colors.json"

func Update() {
	resp, err := http.Get(LinguistUrl)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()
	yamlBytes, _ := io.ReadAll(resp.Body)

	jsonBytes, err := yamlToJson(&yamlBytes)
	if err != nil {
		panic(err)
	}

	err = os.WriteFile(JsonFilePath, jsonBytes, 0644)
	if err != nil {
		panic(err)
	}
	fmt.Println("done")
}

func yamlToJson(yamlBytes *[]byte) (jsonBytes []byte, err error) {
	type YamlLang struct {
		Color *string `yaml:"color"`
	}

	m := make(map[string]YamlLang)
	err = yaml.Unmarshal(*yamlBytes, &m)
	if err != nil {
		return nil, err
	}

	langs := []string{}
	for name, v := range m {
		if v.Color != nil {
			langs = append(langs, name)
		}
	}

	if len(langs) == 0 {
		err = fmt.Errorf("too few languages( %d )", len(langs))
		return nil, err
	}

	sort.Slice(langs, func(i, j int) bool { return langs[i] < langs[j] })

	jsonMap := make(map[string]string)
	for _, lang := range langs {
		jsonMap[lang] = strings.ToLower(*m[lang].Color)
	}
	return json.MarshalIndent(jsonMap, "", "  ")
}
