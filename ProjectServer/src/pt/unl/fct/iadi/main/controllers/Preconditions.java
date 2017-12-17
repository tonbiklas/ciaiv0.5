package pt.unl.fct.iadi.main.controllers;

// Inspired by: http://www.baeldung.com/building-a-restful-web-service-with-spring-and-java-based-configuration

import pt.unl.fct.iadi.main.exceptions.BadRequestException;
import pt.unl.fct.iadi.main.exceptions.BrokenPrecondition;
import pt.unl.fct.iadi.main.exceptions.ResourceNotFoundException;

public class Preconditions {
    public static <T> T checkFound(T resource) {
        if (resource == null) {
            throw new ResourceNotFoundException();
        }
        return resource;
    }

    public static <T> T notNull(T resource) {
        if (resource == null) {
            throw new BadRequestException();
        }
        return resource;
    }

    public static void checkCondition(boolean cond) {
        if (!cond) {
            throw new BrokenPrecondition();
        }
    }

}