import os

import gdown
import torch
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer

#Best BillSum - BART
class T5Model:
    def __init__(self):
        self.pretrained_model_name = "facebook/bart-base"

        self.tokenizer = AutoTokenizer.from_pretrained(self.pretrained_model_name)
        self.model = AutoModelForSeq2SeqLM.from_pretrained(self.pretrained_model_name)
        self.model.config.max_encoder_position_embeddings = 256
        self.model.config.max_decoder_position_embeddings = 64
        self.model.config.max_length = 500

        self.root_dir = "artifact"
        self.weights_file = "weights.pth"
        self.check_path()

        self.model.load_state_dict(
            torch.load(
                f"{self.root_dir}/{self.weights_file}", map_location=torch.device("cpu")
            )
        )

        self.encoder_max_length = 256
        self.decoder_max_length = 64

    def check_path(self) -> None:
        check = [
            file
            for _, _, files in os.walk(self.root_dir)
            for file in files
            if file == self.weights_file
        ]

        if not check:
            file_id = "1ka6S-eaU0Tk_60QrmpiPvNj-c5pPK336"
            output = f"{self.root_dir}/{self.weights_file}"
            gdown.download(id=file_id, output=output, quiet=False)

    def generate_summary(self, test_case: dict) -> str:
        inputs = self.tokenizer(
            test_case["text"],
            padding="max_length",
            truncation=True,
            max_length=self.encoder_max_length,
            return_tensors="pt",
        )

        input_ids = inputs.input_ids.to(self.model.device)
        attention_mask = inputs.attention_mask.to(self.model.device)
        outputs = self.model.generate(input_ids, attention_mask=attention_mask)
        output_str = self.tokenizer.batch_decode(outputs, skip_special_tokens=True)

        return {"output": output_str[0]}
    
