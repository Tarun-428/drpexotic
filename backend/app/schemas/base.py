from pydantic import BaseModel, ConfigDict


class MongoModel(BaseModel):
  model_config = ConfigDict(from_attributes=True)

  id: str
