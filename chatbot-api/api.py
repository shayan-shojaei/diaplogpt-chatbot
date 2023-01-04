from transformers import (
    AutoTokenizer,
    AutoModelForCausalLM,
)
import torch
from typing import List
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

model_name = "microsoft/DialoGPT-medium"
model = AutoModelForCausalLM.from_pretrained(model_name)
tokenizer = AutoTokenizer.from_pretrained(model_name)


def tokenize_sentence(sentence: str):
    return tokenizer.encode(sentence + tokenizer.eos_token, return_tensors="pt")


def tokenize_and_concat(sentences: List[str]):
    tokens = list(map(tokenize_sentence, sentences))
    return torch.cat(tokens, dim=-1)


def generate_reply(token_ids):
    return model.generate(
        token_ids,
        max_length=1000,
        pad_token_id=tokenizer.eos_token_id,
    )


def decode_reply(history_ids, token_ids):
    return tokenizer.decode(
        history_ids[:, token_ids.shape[-1] :][0],
        skip_special_tokens=True,
    )


""" 
token_ids = tokenize_and_concat(sentences)
history_ids = generate_reply(token_ids)
reply = decode_reply(history_ids, token_ids)
"""


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Data(BaseModel):
    sentences: List[str]


@app.post("/")
def get_reply(data: Data):
    token_ids = tokenize_and_concat(data.sentences)
    history_ids = generate_reply(token_ids)
    reply = decode_reply(history_ids, token_ids)
    return {
        "reply": reply,
        "full": [*data.sentences, reply],
    }
