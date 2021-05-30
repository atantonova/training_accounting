package com.coursework.training_accounting.util;

import com.coursework.training_accounting.domain.Occupation;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;

public class OccupationSerializer extends JsonSerializer<Occupation> {

    @Override
    public void serialize(Occupation occupation, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeNumberField("id", occupation.getId());
        jsonGenerator.writeStringField("name", occupation.getName());
        jsonGenerator.writeEndObject();
    }
}
