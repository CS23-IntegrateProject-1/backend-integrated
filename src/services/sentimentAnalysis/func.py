try:
    import os
    import argparse
    import json
    from google.cloud import language_v2
    from google.oauth2 import service_account
except Exception as e:
    print(e)

def sample_analyze_sentiment(text_content: str = None) -> None:
    client_file = "../keys.json"
    if not os.path.isfile(client_file):
        print("Credentials file not found")
        return
    if text_content is None:
        print("No text content found")
        return

    try:
        credentials = service_account.Credentials.from_service_account_file(client_file)
        client = language_v2.LanguageServiceClient(credentials=credentials)

        document_type_in_plain_text = language_v2.Document.Type.PLAIN_TEXT

        language_code = "en"
        document = {
            "content": text_content,
            "type_": document_type_in_plain_text,
            "language_code": language_code,
        }

        encoding_type = language_v2.EncodingType.UTF8

        response = client.analyze_sentiment(
            request={"document": document, "encoding_type": encoding_type}
        )

        # Extract relevant information as a dictionary
        result_dict = {
            "document_sentiment": {
                "magnitude": response.document_sentiment.magnitude,
                "score": response.document_sentiment.score,
            },
            "language_code": response.language_code,
            "sentences": [
                {
                    "text": {
                        "content": sentence.text.content,
                    },
                    "sentiment": {
                        "magnitude": sentence.sentiment.magnitude,
                        "score": sentence.sentiment.score,
                    },
                }
                for sentence in response.sentences
            ],
            "language_supported": True,
        }

        # Print the result as a JSON-formatted string
        print(json.dumps(result_dict))
    
    except Exception as e:
        print(e)

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('--review', type=str, help='input of string')
    opt = parser.parse_args()
    sample_analyze_sentiment(opt.review)
