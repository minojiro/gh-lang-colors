package cmd

import (
	"testing"
)

func TestYamlToJson(t *testing.T) {
	yamlBytes := []byte("Go:\n  type: programming\n  color: \"#E8274B\"\nc:\n  type: programming")
	expect := "{\n  \"Go\": \"#e8274b\"\n}"

	t.Run("yamlToJson", func(t *testing.T) {
		got, _ := yamlToJson(&yamlBytes)
		gotStr := string(got)
		if gotStr != expect {
			t.Errorf("expect: %v, actual: %v", expect, string(got))
		}
	})
}
