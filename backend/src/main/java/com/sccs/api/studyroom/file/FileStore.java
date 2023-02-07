package com.sccs.api.studyroom.file;

import com.sccs.api.studyroom.dto.SubmissionDto;
import java.io.File;
import java.io.IOException;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class FileStore {

  @Value("${file.dir}")
  private String fileDir;

  public String getFullPath(String path, String filename) {
    return fileDir + path + "/" + filename;
  }

  public String storeFile(SubmissionDto submissionDto, String problemFolder) throws IOException {
    MultipartFile file = submissionDto.getFormFile();
    int languageId = submissionDto.getLanguageId();
    String path = problemFolder;
    String end = null;
    if (file.isEmpty()) {
      return null;
    }
    if (languageId == 1) {
      end = "py";
    } else if (languageId == 2) {
      end = "java";
    }
    String fileName = createStoreFileName(end);
    file.transferTo(new File(getFullPath(path, fileName)));
    return fileName;
  }

  private String createStoreFileName(String end) {
    String uuid = UUID.randomUUID().toString();
    return uuid + "." + end;
  }
}