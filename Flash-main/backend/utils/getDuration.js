const getDuration = (durationString) => {
    const duration = { hours: 0, minutes: 0, seconds: 0 };
    const durationParts = durationString
      .replace("PT", "")
      .replace("H", ":")
      .replace("M", ":")
      .replace("S", "")
      .split(":");
  
    if (durationParts.length === 3) {
      duration["hours"] = parseInt(durationParts[0]);
      duration["minutes"] = parseInt(durationParts[1]);
      duration["seconds"] = parseInt(durationParts[2]);
    }
  
    if (durationParts.length === 2) {
      duration["minutes"] = parseInt(durationParts[0]);
      duration["seconds"] = parseInt(durationParts[1]);
    }
  
    if (durationParts.length === 1) {
      duration["seconds"] = parseInt(durationParts[0]);
    }
  
    return {
      ...duration,
      string: `${duration.hours}hr ${duration.minutes}min ${duration.seconds}sec`,
    };
  };

module.exports={getDuration}